import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { LOCAL_STORAGE_PREFIX } from '../config';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const prefixedKey = LOCAL_STORAGE_PREFIX + key;
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [value, prefixedKey]);

    return [value, setValue];
}