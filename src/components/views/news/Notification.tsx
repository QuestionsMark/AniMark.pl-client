import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const Notification = () => {
    return (
        <Popup className="normal-popup" trigger={<div className="news__notification">
            <FontAwesomeIcon icon={faBell} />
        </div>} on="hover" position="top center">
            Mamy Nowego Niuuusa!
        </Popup>
    );
};