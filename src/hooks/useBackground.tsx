import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HOST_ADDRESS } from "../config";
import { fetchTool } from "../utils/fetchHelper";

export const useBackground = () => {

    const bodyRef = useRef(document.body);
    const prevId = useRef<string | null>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (!bodyRef.current) return;
        (async () => {
            const parts = pathname.split('/');
            let background: string = '';
            if (parts[1] === 'users' && parts[2]) {
                if (!prevId.current) {
                    const { status, results } = await fetchTool(`users/${parts[2]}/background`);
                    if (!status) return;
                    background = results;
                } else {
                    if (prevId.current === parts[2]) return;
                    const { status, results } = await fetchTool(`users/${parts[2]}/background`);
                    if (!status) return;
                    background = results;
                }
                prevId.current = parts[2];
            } else if (parts[1] === 'anime' && parts[2]) {
                if (!prevId.current) {
                    const { status, results } = await fetchTool(`anime/${parts[2]}/background`);
                    if (!status) return;
                    background = results;
                } else {
                    if (prevId.current === parts[2]) return;
                    const { status, results } = await fetchTool(`anime/${parts[2]}/background`);
                    if (!status) return;
                    background = results;
                }
                prevId.current = parts[2];
            } else {
                prevId.current = '';
            }
            bodyRef.current.style.backgroundImage = background ? `url('${HOST_ADDRESS}/media/${background}')` : '';
        })()
    }, [pathname]);
};