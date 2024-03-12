import React, { createContext, useState, useEffect } from 'react';

import { io } from 'socket.io-client'
import { SOCKET_URL_IO } from '../services/config'

const SocketContext = createContext(null);

const socketio = io(SOCKET_URL_IO, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionAttempts': Infinity,
    'transports': ['websocket']
})

const SocketProvider = ({ children }) => {
    const [socketId, setSocketId] = useState('');

    useEffect(() => {
        socketio.on('connect', () => {
            console.log('socket connected')
            setSocketId(socketio.id)
        })
        socketio.on('disconnect', () => {
            console.log('socket disconnected')
        })



    }, [])

    useEffect(() => {
        console.log('sss')
    }, [socketio])

    return (
        <SocketContext.Provider value={{ socketId, setSocketId }}>
            {children}
        </SocketContext.Provider>
    )
}
export { SocketProvider, SocketContext, socketio };