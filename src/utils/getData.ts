import { Dispatch, RefObject, SetStateAction } from "react";
import { ResponsePopup } from "../contexts/popupContext";
import { CommentPopulate } from "../types";
import { fetchApiTool } from "./fetchHelper";

export const getData = async (path: string, setState: Dispatch<SetStateAction<any>>, ref: RefObject<HTMLElement>) => {
    const startTime = new Date().valueOf();
    const response = await fetchApiTool(path);
    if (!response.status || !ref.current) return;
    const endTime = new Date().valueOf();
    setTimeout(() => {
        if (!ref.current) return;
        setState(response.results);
    }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
};

export const getLimitedComments = async (path: string, limit: number, ref: RefObject<HTMLElement>, setState: Dispatch<SetStateAction<CommentPopulate[] | null>>, setResponsePopup: Dispatch<SetStateAction<ResponsePopup>>) => {
    const startTime = new Date().valueOf();
    const response = await fetchApiTool(path);
    if (!ref.current) return;
    const endTime = new Date().valueOf();
    setTimeout(() => {
        if (!ref.current) return;
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        const results = response.results as CommentPopulate[];
        setState(state => {
            if (state) {
                const index = state.findIndex(c => c.id === results[0].id);
                if (index !== -1) return [...state.slice(0, index), ...results];
            }
            return results;
        });
    }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
};