import { Link } from "react-router-dom";
import { RegistrationForm } from "../formElements/RegistrationForm";

interface Props {
    openLoginContent: () => void;
}

export const RegistrationContent = ({ openLoginContent }: Props) => {
    return (
        <>
            <h2 className="login-popup__title">Rejestracja</h2>
            <RegistrationForm />
            <div className="login-popup__help">
                <p className="login-popup__text link special" onClick={openLoginContent}>przejdź do logowania</p>
                <Link to="/rules" target="_blank" className="login-popup__text link">regulamin</Link>
                <Link to="/privacy-policy" target="_blank" className="login-popup__text link">polityka prywatności</Link>
            </div>
        </>
    );
};