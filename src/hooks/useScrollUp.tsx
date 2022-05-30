import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollUp = (page?: Number) => {

    const location = useLocation();
    const html = useRef(document.querySelector('html'));

    useEffect(() => {
        if (!html.current) return;
        html.current.scroll({
            behavior: 'smooth',
            top: 0,
        });
    }, [page, location]);

};