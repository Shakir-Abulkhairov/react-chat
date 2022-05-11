import { io } from "socket.io-client";
const URL = "http://localhost:8080";
const socket = io(URL,  { transports: ['websocket'] });
export default socket;