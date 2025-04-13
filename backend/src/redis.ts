import { createClient } from "redis";

const client = createClient();

async function redisConnection(){
    try {
        await client.connect();
        console.log("Connected to the redis database");
    } catch (error) {
        console.log("Error while connection to the redis database");
    }
}

export default redisConnection
export {client};