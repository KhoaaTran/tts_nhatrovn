import { io } from 'socket.io-client'
import { SOCKET_URL_IO } from '../services/config'

export const socket = io(SOCKET_URL_IO, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionAttempts': Infinity,
    'transports': ['websocket']
})