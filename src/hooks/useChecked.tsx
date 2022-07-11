import { useEffect, useState } from "react";

export const useChecked = (checkFunction: Function, dependencies: any[], conditions: any[] = [], initial: boolean = false) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(initial);

    useEffect(() => {

        if (conditions.reduce((p, a) => {
            if (!a) return false;
            return p;
        }, true)) {
            setResult(checkFunction());
            setIsChecked(true);
        }
    }, [...dependencies]);

    return { isChecked, result };
};