import { io } from "socket.io-client";

const socket = io("http://192.168.31.65:5000", {
  transports: ["websocket"],
});


export default socket;
