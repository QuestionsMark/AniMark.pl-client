import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoginLogout = () => {

    const { status } = { status: false };

    const handleLogin = () => {
        // setOpenLoginScreen(true);
    };

    const handleLogOut = () => {
        // 
        // localStorage.removeItem('animark-user-id')
        // localStorage.removeItem('animark-token');
        // history.push('/');
        // window.location.reload();
    };

    return (
        <>
            {status ?
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