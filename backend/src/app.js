// imports
import express from "express";
import cors from 'cors';
import http from 'http';
import cookieParser from "cookie-parser";
// rutas
import loginRoute from './routes/login.route.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import repairRoute from './routes/repair.route.js';
import recoveryRoute from './routes/recovery.route.js';
// socket
import { initSocket } from "./socket.js";

const app = express();
const server = http.createServer(app);

// inicializar socket en el server
initSocket(server);
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

// Registrar rutas
app.use(loginRoute);
app.use(authRoute);
app.use("/user",userRoute);
app.use("/repair",repairRoute);
app.use("/recovery",recoveryRoute);

export default server;
