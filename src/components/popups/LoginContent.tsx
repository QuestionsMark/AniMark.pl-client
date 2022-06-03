import { LoginForm } from "../formElements/LoginForm";

interface Props {
    openRegistrationContent: () => void;
}

export const LoginContent = ({ openRegistrationContent }: Props) => {
    return (
        <>
            <h2 className="login-popup__title">Logowanie</h2>
            <LoginForm />
            <div className="login-popup__help">
                <p className="login-popup__text link">Zapomniałeś hasła?</p>
                <p className="login-popup__text">Nie masz jeszcze konta? <span className="login-popup__goRegister" onClick={openRegistrationContent}>Zarejestruj się</span> już teraz!</p>
            </div>
        </>
    );
};