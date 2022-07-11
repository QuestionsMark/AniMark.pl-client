import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { HOST_ADDRESS } from '../config';
import { useUser } from './userContext';

interface SocketContextValue {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextValue>(null!);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const { user } = useUser();

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(HOST_ADDRESS);
        setSocket(newSocket);
        return () => { newSocket.close() };
    }, []);

    useEffect(() => {
        if (!socket) return;
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            socket.emit('online-users__new', { userId: user.userId || null });
        }, 500);
        return () => { socket.off('connect') };
    }, [socket, user.userId]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}