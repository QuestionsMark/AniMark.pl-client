import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import { HOST_ADDRESS } from "../../../config";
import { AchievementAPI } from "../../../types";

interface Props {
    achievement: AchievementAPI;
}

export const UserAchievementElement = ({ achievement }: Props) => {

    const { name, description, icon, level } = achievement;

    const stars = () => {
        const stars: JSX.Element[] = [];
        for (let i = 0; i < level; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} className="users__achievement-level-icon" />);
        };
        return stars;
    };

    return (
        <Popup on="hover" className="normal-popup" trigger={<div className="users__achievement" style={{ backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }} />} mouseEnterDelay={200} position="top center">
            <div className="users__achievement-info">
                <p className="users__achievement-title">{name}</p>
                <p className="users__achievement-level">{stars()}</p>
                <p className="users__achievement-description">{description}</p>
            </div>
        </Popup>
    );
};