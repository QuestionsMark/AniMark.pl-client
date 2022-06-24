import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface LoginPopup {
    open: boolean;
    status: boolean;
    message: string;
}

export interface ResponsePopup {
    open: boolean;
    status: boolean;
    message: string;
}

interface ConfirmPopup {
    open: boolean;
    question: string;
    acceptHandler: () => void;
    declineHandler?: () => void;
}

interface PopupContextValue {
    loginPopup: LoginPopup;
    setLoginPopup: Dispatch<SetStateAction<LoginPopup>>;
    responsePopup: ResponsePopup;
    setResponsePopup: Dispatch<SetStateAction<ResponsePopup>>;
    confirmPopup: ConfirmPopup;
    setConfirmPopup: Dispatch<SetStateAction<ConfirmPopup>>;
}

const defaultLoginPopup: LoginPopup = {
    open: false,
    status: false,
    message: '',
}

const defaultResponsePopup: ResponsePopup = {
    open: false,
    status: false,
    message: '',
}

const defaultConfirmPopup: ConfirmPopup = {
    open: false,
    question: '',
    acceptHandler: () => { },
}

const PopupContext = createContext<PopupContextValue>(null!);

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }: { children: ReactNode }) => {

    const [loginPopup, setLoginPopup] = useState<LoginPopup>(defaultLoginPopup);
    const [responsePopup, setResponsePopup] = useState<ResponsePopup>(defaultResponsePopup);
    const [confirmPopup, setConfirmPopup] = useState<ConfirmPopup>(defaultConfirmPopup);

    return (
        <PopupContext.Provider value={{ loginPopup, setLoginPopup, responsePopup, setResponsePopup, confirmPopup, setConfirmPopup }}>
            {children}
        </PopupContext.Provider>
    );
};