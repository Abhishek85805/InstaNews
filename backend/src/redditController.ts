import axios from 'axios';
import dotenv from 'dotenv';
import {Request, Response} from 'express'
import { client } from './redis';

dotenv.config();


async function generalReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('generalReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/news/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('generalReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function sportsReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('sportsReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/sports/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('sportsReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function crimeReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('crimeReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/crime/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('crimeReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function healthReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('healthReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/health/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('healthReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function entertainmentReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('entertainmentReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/entertainment/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('entertainmentReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function techReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('techReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/tech/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('techReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function scienceReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('scienceReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/science/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('scienceReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function businessReddit(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('businessReddit');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://www.reddit.com/r/business/.json`);
        const data = response.data.data.children;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.data.name
                    },
                    title: obj.data.title,
                    url: obj.data.url
                }
            )
        })
        await client.hSet('businessReddit', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

export {generalReddit, sportsReddit, businessReddit, scienceReddit, techReddit, entertainmentReddit, healthReddit, crimeReddit}