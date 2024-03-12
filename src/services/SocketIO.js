import { io } from "socket.io-client";
import { SOCKET_URL_IO } from "./config";

const socket = io.connect(SOCKET_URL_IO, {
    transports: ['websocket'],
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionAttempts': 'Infinity',
    'timeout': 20000,
    extraHeaders: {
        Authorization: "Bearer authorization_token_here"
    }
});

export default socket;