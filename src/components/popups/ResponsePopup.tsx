import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import { usePopup } from "../../contexts/popupContext";

export const ResponsePopup = () => {

    const { responsePopup, setResponsePopup } = usePopup();
    const { message, open, status } = responsePopup;

    const closePopup = () => {
        setResponsePopup({ message: '', open: false, status: false });
    }

    return (
        <Popup open={open} modal className="modal-popup" onClose={closePopup}>
            <div className={`response-popup${status ? ' response-popup--ok' : ' response-popup--not-ok'}`}>
                <FontAwesomeIcon icon={faXmark} className="response-popup__icon" onClick={() => setResponsePopup({ message: '', open: false, status: false })} />
                <h3 className="response-popup__title">{status ? 'Sukces' : 'Błąd'}</h3>
                <p className="response-popup__text text">
                    {message}
                </p>
            </div>
        </Popup>
    );
};