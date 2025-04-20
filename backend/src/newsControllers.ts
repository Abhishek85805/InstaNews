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

async function crimeNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('crimeNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?q=crime&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('crimeNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function sportsNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('sportsNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('sportsNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function healthNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('healthNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('healthNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function entertainmentNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('entertainmentNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('entertainmentNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function techNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('techNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('techNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function businessNews(req: Request, res: Response): Promise<any>{
    try {
        // If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('businessNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('businessNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

async function scienceNews(req: Request, res: Response): Promise<any>{
    try {
        //If it's been less than 50 minutes since the last call
        const redisData = await client.hGetAll('scienceNews');
        if(redisData && Date.now() - Number(redisData.time) <= 3000000){
            return res.status(200).json(JSON.parse(redisData.data));
        }

        // If the last call happened 50 minutes ago
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const data = response.data.articles;
        await client.hSet('scienceNews', {data: JSON.stringify(data), time: Date.now()});
        return res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server error"
        });
    }
}

export {generalNews, crimeNews, sportsNews, healthNews, entertainmentNews, techNews, businessNews, scienceNews}