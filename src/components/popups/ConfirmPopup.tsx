import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";
import Popup from "reactjs-popup";
import { usePopup } from "../../contexts/popupContext";
import { textHelper } from "../../utils/textHelper";

export const ConfirmPopup = () => {

    const { confirmPopup, setConfirmPopup } = usePopup();
    const { open, question, acceptHandler, declineHandler } = confirmPopup;

    const closeConfirmPopup = () => {
        setConfirmPopup({ open: false, question: '', acceptHandler: () => { }, declineHandler: () => { } });
    };

    const handleAccept = (e: FormEvent) => {
        e.preventDefault();
        closeConfirmPopup();
        acceptHandler();
    };
    const handleDecline = (e: FormEvent) => {
        e.preventDefault();
        declineHandler ? declineHandler() : closeConfirmPopup();
    };

    return (
        <Popup open={open} modal className="modal-popup" onClose={closeConfirmPopup}>
            <div className={`response-popup response-popup--ok`}>
                <FontAwesomeIcon icon={faXmark} className="response-popup__icon" onClick={closeConfirmPopup} />
                <div className="response-popup__text">
                    {textHelper(question)}
                </div>
                <div className="response-popup__buttons">
                    <button id="btn" className="btn response-popup__buttons-btn--accept" onClick={handleAccept}>Tak</button>
                    <button id="btn" className="btn response-popup__buttons-btn--decline" onClick={handleDecline}>Nie</button>
                </div>
            </div>
        </Popup>
    );
};