import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../contexts/popupContext";
import { useUser } from "../../contexts/userContext";

export const LoginLogout = () => {

    const { user, setToken } = useUser();
    const { setLoginPopup } = usePopup();
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoginPopup({ message: '', open: true, status: false });
    };

    const handleLogOut = () => {
        setToken(null);
        navigate('/');
    };

    return (
        <>
            {user.logged ?
                <div className="login-logout" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="login-logout__icon" />
                    <span className="login-logout__text">Wyloguj</span>
                </div> :
                <div className="login-logout" onClick={handleLogin}>
                    <FontAwesomeIcon icon={faRightToBracket} className="login-logout__icon" />
                    <span className="login-logout__text">Zaloguj</span>
                </div>}
        </>
    );
};