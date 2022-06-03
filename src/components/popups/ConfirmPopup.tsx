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
        declineHandler();
    };

    return (
        <Popup open={open} modal className="modal-popup" onClose={closeConfirmPopup}>
            <div className="popup__confirm">
                <div className="popup__text">
                    {textHelper(question)}
                </div>
                <div className="popup__buttons">
                    <button className="btn--confirm" onClick={handleAccept}>Tak</button>
                    <button className="btn--delete" onClick={handleDecline}>Nie</button>
                </div>
            </div>
        </Popup>
    );
};