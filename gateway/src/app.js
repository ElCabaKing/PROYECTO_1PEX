// imports
import express from "express";
import path from "path";
import http from 'http';
import cookieParser from "cookie-parser";
import cors from "cors";
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

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);


app.use(cors({
  origin: [process.env.FRONT_URL],
  credentials: true,
}));

// inicializar socket en el server
initSocket(server);
app.use(cookieParser()); 
app.use(express.json());



// Registrar rutas
app.use("/api/log",loginRoute);
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/repair",repairRoute);
app.use("/api/recovery",recoveryRoute);
app.use("/api/parts",partsRoute);
app.use("/api/services",servicesRoute);
app.use("/api/chat",chatRoute);



app.use(express.static(path.join(__dirname, "frontend/build")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend/build", "index.html")
  );
});


export default server;
