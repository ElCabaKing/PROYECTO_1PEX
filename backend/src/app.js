// imports
import express from "express";
import cors from 'cors';
import http from 'http';
import cookieParser from "cookie-parser";
// rutas
import loginRoute from './modules/login/login.route.js';
import authRoute from './modules/auth/auth.route.js';
import userRoute from './modules/user/user.route.js';
import repairRoute from './modules/repair/repair.route.js';
import recoveryRoute from './modules/recovery/recovery.route.js';
import partsRoute from './modules/parts/parts.route.js';
import servicesRoute from './modules/services/services.route.js';
import chatRoute from './modules/chat/chat.route.js';
// socket
import { initSocket } from "./socket.js";
//middleware
import errorHandler from './utils/ErrorHandler.js'

const app = express();
const server = http.createServer(app);

// inicializar socket en el server
initSocket(server);
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONT_URL],
  credentials: true,
}));



// Registrar rutas
app.use(loginRoute);
app.use(authRoute);
app.use("/user",userRoute);
app.use("/repair",repairRoute);
app.use("/recovery",recoveryRoute);
app.use("/parts",partsRoute);
app.use("/services",servicesRoute);
app.use("/chat",chatRoute);


//middleware global para manejo de errores
app.use(errorHandler);

export default server;
