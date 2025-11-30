import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
let io = null;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado");
  });

  io.use((socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;
    const tokenCookie = rawCookie.split("; ").find(c => c.startsWith("auth_token="));
    const token = tokenCookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hasAdmin= decoded.roles.includes('admin');
    if(hasAdmin){
       socket.join("admins");
       console.log("Usuario añadido a room admins:", decoded.id);
    }
    console.log("Cookie", decoded.roles);
    next();
  })
}


export function emitLoginToAdmins(data) {
  if (io) {
    io.to("admins").emit("statusLogin", data);
  }
}
