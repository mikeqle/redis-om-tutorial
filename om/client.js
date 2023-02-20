import { Client } from "redis-om";
import { createClient } from "redis";


export const connection = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PWD
});
await connection.connect();
connection.on("error", (err) => {
  console.log("Redis Error: " + err);
});

// redis-om now using the redis client connection
// we can use `connection` to access standard redis functionalities
// while using `client` will give us access to the OMs
const client = await new Client().use(connection);

export default client;
