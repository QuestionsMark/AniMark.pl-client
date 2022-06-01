import { useScrollUp } from "../hooks/useScrollUp";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { LoginPopup } from "./popups/LoginPopup";
import { ResponsePopup } from "./popups/ResponsePopup";

export const App = () => {

    useScrollUp();

    return (
        <div className="app">
            <Header />
            <Main />
            <Footer />
            <ResponsePopup />
            <LoginPopup />
        </div>
    );
};
