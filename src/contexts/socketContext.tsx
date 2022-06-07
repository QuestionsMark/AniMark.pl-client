import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { HOST_ADDRESS } from '../config';
import { useUser } from './userContext';

interface SocketContextValue {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextValue>(null!);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const { user } = useUser();

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(HOST_ADDRESS);
        setSocket(newSocket);
        return () => { newSocket.close() };
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit('set-user', { userId: user.userId });
        return () => { socket.off('connect') };
    }, [socket, user.userId]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}