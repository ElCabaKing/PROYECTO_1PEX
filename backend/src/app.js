// imports
import express from "express";
import cors from 'cors';
import http from 'http';

// rutas
import loginRoute from './routes/login.route.js';

// socket
import { initSocket } from "./socket.js";

const app = express();
const server = http.createServer(app);

// inicializar socket en el server
initSocket(server);

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

// Registrar rutas
app.use(loginRoute);

export default server;
