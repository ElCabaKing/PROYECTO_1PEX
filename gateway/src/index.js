import server from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ;

console.log("Corriendo en :",PORT);

server.listen(PORT);