import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { AuthorizationAPI } from "../types";
import { fetchApiTool } from "../utils/fetchHelper";

export const useAuthorization = () => {

    const { token, setToken, setUser } = useUser();

    const checkAuthorization = async () => {
        const response = await fetchApiTool(`authorization/${token}`);
        if (response.status) {
            const { rank, userId, userData } = response.results as AuthorizationAPI;
            setUser({ logged: true, rank, userId, data: userData });
        } else {
            setUser({ logged: false, rank: 0, userId: null, data: null });
            setToken(null);
        }
    };

    useEffect(() => {
        if (!token) return setUser({ logged: false, rank: 0, userId: null, data: null });
        checkAuthorization();
    }, [token]);
};