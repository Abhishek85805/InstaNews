import axios from 'axios';
import dotenv from 'dotenv';
import {Request, Response} from 'express'
import { client } from './redis';

dotenv.config();


async function generalNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('generalNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('generalNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

export {generalNews}