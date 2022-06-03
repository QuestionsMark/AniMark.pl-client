import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Token } from "../types";
import { fetchApiTool } from "../utils/fetchHelper";

export const useAuthorization = () => {

    const { token, setToken, setUser } = useUser();

    const checkAuthorization = async () => {
        const response = await fetchApiTool(`authorization/${token}`);
        if (response.status) {
            const { rank, userId } = response.results as Token;
            setUser({ logged: true, rank, userId });
        } else {
            setUser({ logged: false, rank: 0, userId: null });
            setToken(null);
        }
    };

    useEffect(() => {
        if (!token) return setUser({ logged: false, rank: 0, userId: null });
        checkAuthorization();
    }, [token]);
};