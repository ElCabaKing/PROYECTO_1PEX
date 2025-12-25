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


  io.use((socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;

    if (rawCookie) {
      const tokenCookie = rawCookie
        .split("; ")
        .find(c => c.startsWith("auth_token="));

      if (tokenCookie) {
        try {
          const token = tokenCookie.split("=")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          socket.user = decoded; 
          if (decoded.rol?.includes("admin")) {
            socket.join("admins");
          }
        } catch (err) {
          console.warn("Token inválido, conexión como invitado");
        }
      }
    }

    next();
  });



  io.on("connection", (socket) => {
    socket.on("joinRepairRoom", (repairId) => {
      const room = `repair_${repairId}`;
      socket.join(room);
      console.log(`Socket ${socket.id} entró a ${room}`);
    });
  });

}

export function chatAct(repairId) {
  if (io) {
    io.to(`repair_${repairId}`).emit("ChatRefresh");
  }
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
