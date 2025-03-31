import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000"; 

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
}
