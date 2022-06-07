import { useEffect } from "react";
import { useSocket } from "../contexts/socketContext";
import { useAuthorization } from "../hooks/useAuthorization";
import { useScrollUp } from "../hooks/useScrollUp";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { ConfirmPopup } from "./popups/ConfirmPopup";
import { LoginPopup } from "./popups/LoginPopup";
import { ResponsePopup } from "./popups/ResponsePopup";

export const App = () => {

    const { socket } = useSocket();

    useAuthorization();
    useScrollUp();

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
        socket.on('socket-error', (response) => {
            console.log(response);
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
