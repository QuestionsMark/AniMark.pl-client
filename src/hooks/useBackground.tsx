import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HOST_ADDRESS } from "../config";
import { fetchTool } from "../utils/fetchHelper";

export const useBackground = () => {

    const bodyRef = useRef(document.body);
    const prevUserId = useRef<string | null>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (!bodyRef.current) return;
        (async () => {
            const parts = pathname.split('/');
            let background: string = '';
            if (parts[1] === 'users' && parts[2]) {
                if (!prevUserId.current) {
                    const { status, results } = await fetchTool(`users/${parts[2]}/background`);
                    if (!status) return;
                    background = results;
                } else {
                    if (prevUserId.current === parts[2]) {
                        background = bodyRef.current.style.backgroundImage;
                    } else {
                        const { status, results } = await fetchTool(`users/${parts[2]}/background`);
                        if (!status) return;
                        background = results;
                    }
                }
                prevUserId.current = parts[2];
            } else {
                prevUserId.current = '';
            }
            bodyRef.current.style.backgroundImage = background ? `url(${HOST_ADDRESS}/media/${background})` : '';
        })()
    }, [pathname]);
};