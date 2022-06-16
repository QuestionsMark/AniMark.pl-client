import { HOST_ADDRESS } from "../config";
import { ClientApiResponse, ClientErrorResponse, ClientResponse } from "../types";
import { getLocalStorage } from "./localStorageHelper";

type Method = 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET';

interface ResponseProblem {
    message: string;
    validation?: string[];
}

const showProblem = (response: Response, res: ResponseProblem): ClientErrorResponse => {
    console.warn(res.message);
    if (response.status === 400) return { message: res.message, status: false, validation: res.validation };
    return { message: res.message, status: false };
};

export const fetchTool = async (path: string, method: Method = 'GET', body: any = undefined): Promise<ClientResponse> => {
    try {
        const headers = ['POST', 'PATCH', 'PUT'].includes(method) ? { 'Content-Type': 'application/json' } : undefined;

        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
            method,
            headers,
            body: body && JSON.stringify(body),
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export const fetchApiTool = async (path: string): Promise<ClientApiResponse> => {
    try {
        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export const fetchWithFileUpload = async (path: string, method: Method = 'POST', body: FormData): Promise<ClientResponse> => {
    try {
        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
            method,
            headers: {
                'authorization': getLocalStorage('token'),
            },
            body,
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (error) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
}