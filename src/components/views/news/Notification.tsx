import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const Notification = () => {
    return (
        <Popup className="normal-popup" trigger={<div className="news-article__notification">
            <div className="news-article__notification-shadow" />
            <FontAwesomeIcon icon={faBell} className="news-article__notification-icon" />
        </div>} on="hover" position="top center">
            Mamy Nowego Niuuusa!
        </Popup>
    );
};