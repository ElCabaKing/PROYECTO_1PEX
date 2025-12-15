import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
let io = null;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONT_URL,
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado");
  });

  io.use((socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) { return next(new Error("No token")); }
    let tokenCookie = rawCookie.split("; ").find(c => c.startsWith("auth_token="));
    let secret = process.env.JWT_SECRET
    const token = tokenCookie.split("=")[1];
    const decoded = jwt.verify(token, secret);
    const hasAdmin = decoded.rol.includes('admin');
    if (hasAdmin) {
      socket.join("admins");
    }
    next();
  })
}


export function emitLoginToAdmins(data) {
  if (io) {
    io.to("admins").emit("statusLogin", data);
  }
}

export function emitNewRepair() {
  if (io) {
    io.emit("newRepair");
  }
}

export function emitAlertRepair(message) {
  if (io) {
    io.emit("alertRepair", message);
    io.emit("refreschRepair");
  }
}
