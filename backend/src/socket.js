import { Server } from "socket.io";

let io = null;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado");
  });
}


export function emitLogin(data) {
  if (io) io.emit("repairStatusChanged", data);
}
