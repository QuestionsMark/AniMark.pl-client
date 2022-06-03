import { useAuthorization } from "../hooks/useAuthorization";
import { useScrollUp } from "../hooks/useScrollUp";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { ConfirmPopup } from "./popups/ConfirmPopup";
import { LoginPopup } from "./popups/LoginPopup";
import { ResponsePopup } from "./popups/ResponsePopup";

export const App = () => {

    useAuthorization();
    useScrollUp();

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
