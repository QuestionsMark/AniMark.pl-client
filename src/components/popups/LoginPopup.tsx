import { useState } from "react";
import Popup from "reactjs-popup";

import { usePopup } from "../../contexts/popupContext";

import { LoginContent } from "./LoginContent";
import { RegistrationContent } from "./RegistrationContent";
import { CloseButton } from "../common/CloseButton";

export const LoginPopup = () => {

    const { loginPopup, setLoginPopup } = usePopup();
    const { open } = loginPopup;

    const [registrationContent, setRegistrationContent] = useState(false);
    const handleToggleContent = () => {
        setRegistrationContent(prev => !prev);
        setLoginPopup({ message: '', open: true, status: false });
    };

    const close = () => {
        if (registrationContent) {
            setRegistrationContent(false);
        }
        setLoginPopup({ message: '', open: false, status: false });
    };

    return (
        <Popup open={open} modal className="modal-popup login-popup" onClose={close}>
            <CloseButton handler={close} className="login-popup__icon" />
            {registrationContent ?
                <RegistrationContent openLoginContent={handleToggleContent} /> :
                <LoginContent openRegistrationContent={handleToggleContent} />}
        </Popup>
    );
};