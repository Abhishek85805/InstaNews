import express, {NextFunction, Request, response, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { generalNews } from './newsControllers';
import redisConnection from './redis';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const SignupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()// make it more strict before production
});

const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string()// make it more strict before production
});

interface CustomRequest extends Request {
    userId?: number
}

interface PayloadType {
    id: number
}

function createJWT(id: number){
    const payload: PayloadType = {id}
    const token = jwt.sign({id}, process.env.JWT_SECRET || "");
    return token;
}

function verifyJWT(token: string){
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as PayloadType;
        return {success: true, data: decoded};
    } catch (error) {
        return {success: false, error};
    }

}


// Builtin Middlewares
app.use(express.json());
app.use(cors());

// Custom Middleware
function authMiddleware(req: CustomRequest, res: Response, next: NextFunction){
    // Fetch token from the request.headers
    const header = req.headers["authorization"];
    if(!header){
        res.status(401).json({
            msg: "Unauthorized Request"
        });
        return;
    }

    // Check if token is there
    const token = header.split(' ')[1];

    // Verify the token
    const result = verifyJWT(token);
    if(!result.success){
        res.status(401).json({
            msg: "Unauthorized Request"
        });
        return;
    }

    // put id in userId
    req.userId = result.data?.id 

    // call next function
    return next();
}

function validateCategoriesMiddleware(req: CustomRequest, res: Response, next: NextFunction){
    const {categories} = req.body;
    if(!categories || typeof categories !== "string" || categories.trim() === ""){
        res.status(400).json({
            error: "Select atleast 1 category"
        });
        return;
    }

    const catArray = categories.split(" ");
    if(catArray.length < 1){
        res.status(400).json({
            error: "Select atleast 1 category"
        });
        return;
    }

    type CategoriesType = "crime" | "sports"
    const allowedCategories: CategoriesType[] = ["crime", "sports"]
    const invalid = catArray.filter((val) => !allowedCategories.includes(val as CategoriesType));

    if(invalid.length > 0){
        res.status(400).json({
            error: "Invalid Categories"
        });
        return;
    }

    next();
}

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Server is running fine"
    });
});

// Signing up route
app.post('/api/v1/signup', async(req, res): Promise<any> => {
    // Validation
    const { success } = SignupSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            msg: "Invalid inputs"
        });
    }

    try {
        // Make sure user with same email doesn't exist
        const userExist = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if(userExist){
            return res.status(409).json({
                msg: "User with same email already exist"
            });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        // Create the user
        const user = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            }
        })

        const token = createJWT(user.id);
        return res.status(201).json({
            msg: "User signed up successfully",
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error while signing up"
        })
    }
});

// Signing in route
app.post('/api/v1/signin', async(req, res): Promise<any> => {
    const { success } = SigninSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            msg: "Invalid inputs"
        });
    }

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if(!user){
            return res.status(404).json({
                msg: "Email doesn't exist"
            })
        }
    
        // Compare password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                msg: "Incorrect password"
            });
        }

        // Create Token
        const token = createJWT(user.id);
    
        // Signing in
        return res.status(200).json({
            msg: "User signed in successfully",
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error while signing in"
        })
    }
});

// Get User
app.get('/api/v1/user', authMiddleware, async(req: CustomRequest, res): Promise<any> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        });
    
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            msg: "Error while fetching user"
        })
    }
});

// update 
app.patch('/api/v1/', authMiddleware, validateCategoriesMiddleware, async(req: CustomRequest, res): Promise<any> => {
    // check if category is present in req.body
    const categories = req.body.categories.trim();

    try {
        // update the resource
        const user = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                categories: categories
            }
        })
    
        // Return response
        return res.status(200).json({
            msg: "Updated Successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error while updating the resource"
        })
    }
});

// Validate Category Route
app.post('/api/v1/validate-category', validateCategoriesMiddleware, async(req, res): Promise<any> => {
    return res.status(200).json({
        msg: "Categories are valid"
    });
});

// News Apis
app.get('/api/v1/general/news', generalNews);



app.listen(port, async() => {
    try {
        await redisConnection();
        console.log(`Listening on port ${port}`);
    } catch (error) {
        console.log("Redis connection error")
    }
});
