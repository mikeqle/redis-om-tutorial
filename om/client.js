import { Client } from "redis-om";
import { createClient } from "redis";

const url = process.env.REDIS_URL;

export const connection = createClient(url);
await connection.connect();

// redis-om now using the redis client connection
// we can use `connection` to access standard redis functionalities
// while using `client` will give us access to the OMs
const client = await new Client().use(connection);

export default client;