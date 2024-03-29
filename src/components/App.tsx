import { useEffect } from "react";
import { usePopup } from "../contexts/popupContext";
import { useSocket } from "../contexts/socketContext";
import { useAuthorization } from "../hooks/useAuthorization";
import { useBackground } from "../hooks/useBackground";
import { useScrollUp } from "../hooks/useScrollUp";
import { SocketErrorResponse } from "../types";
import { setNotificationPermission } from "../utils/setNotification";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { ConfirmPopup } from "./popups/ConfirmPopup";
import { LoginPopup } from "./popups/LoginPopup";
import { ResponsePopup } from "./popups/ResponsePopup";

export const App = () => {

    const { socket } = useSocket();
    const { setResponsePopup } = usePopup();

    useAuthorization();
    useScrollUp();
    useBackground();
    setNotificationPermission();

    useEffect(() => {
        if (socket === null) return;
        socket.on('user-connected', async (message: string) => {
            // await getWhatsTheMelody();
            console.log(message);

        });
        return () => { socket.off('user-connected') };
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('socket-error', ({ message, status, validation }: SocketErrorResponse) => {
            setResponsePopup({ message, open: true, status });
        });
        return () => { socket.off('socket-error') };
    }, [socket]);

    return (
        <div className="app">
            <Header />
            <Main />
            <Footer />
            <LoginPopup />
            <ResponsePopup />
            <ConfirmPopup />
        </div>
    );
};
