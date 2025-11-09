import React, { createContext, useContext, useEffect,  } from "react";
import {io} from 'socket.io-client';
// Create the context
export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

// Socket provider component
const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected to the server , ${socket.id}`);
        })

        socket.on('disconnect', () => {
            console.log("Disconnected to the server")
        })
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;