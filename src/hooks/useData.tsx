import { RefObject, useEffect, useState } from "react";
import { AnyData } from "../types";
import { getData } from "../utils/getData";

export const useData = (path: string, ref: RefObject<HTMLElement>) => {
    const [data, setData] = useState<AnyData | null>(null);
    useEffect(() => {
        getData(path, setData, ref);
    }, []);
    return data;
};