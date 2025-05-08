import axios from 'axios';
import dotenv from 'dotenv';
import {Request, Response} from 'express'
import { client } from './redis';

dotenv.config();


async function generalTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('generalTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('generalTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function sportsTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('sportsTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&categories=sports`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('sportsTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function businessTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('businessTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&categories=business`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('businessTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function entertainmentTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('entertainmentTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&categories=entertainment`);
        const data = response.data.data;
        console.log(data);
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('entertainmentTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function healthTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('healthTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&categories=health`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('healthTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function scienceTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('scienceTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&categories=science`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('scienceTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function technologyTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('technologyTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&categories=technology`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('technologyTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function crimeTwitter(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('crimeTwitter');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://api.mediastack.com/v1/news?access_key=${process.env.TWITTER_KEY}&keywords=crime`);
        const data = response.data.data;
        const finalData = data.map((obj:any) => {
            return (
                {
                    source: {
                        name: obj.source
                    },
                    title: obj.title,
                    content: obj.description,
                    url: obj.url,
                    urlToImage: obj.image
                }
            )
        })
        await client.hSet('crimeTwitter', {data: JSON.stringify(finalData), time: Date.now()});
        return res.status(200).json(finalData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

export {generalTwitter, sportsTwitter, businessTwitter, entertainmentTwitter, healthTwitter, scienceTwitter, technologyTwitter, crimeTwitter}