import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
    logged: boolean;
    rank: number;
    userId: string | null;
}

const defaultUser: User = {
    logged: false,
    rank: 0,
    userId: null,
};

interface UserContextValue {
    token: string | null;
    user: User;
    setToken: Dispatch<SetStateAction<string | null>>;
    setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<UserContextValue>(null!);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [token, setToken] = useLocalStorage<string | null>('token', null);
    const [user, setUser] = useState<User>(defaultUser);

    return (
        <UserContext.Provider value={{ token, user, setToken, setUser }}>
            {children}
        </UserContext.Provider>
    );
}