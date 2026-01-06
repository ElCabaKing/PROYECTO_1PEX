import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
let io = null;

export function initSocket(server) {
  io = new Server(server, {
  });


  io.use((socket, next) => {


    next();
  });



  io.on("connection", (socket) => {

  });

}
