import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Popup from "reactjs-popup";
import { Color, getColor } from "../../../utils/getColor";

interface Props {
    icon: IconDefinition;
    name: string;
    info: ReactNode;
    color: Color;
}

export const AchievementsStatisticElement = ({ color, icon, info, name }: Props) => {
    return (
        <p className="achievements__group-info">
            <Popup
                className="normal-popup"
                trigger={
                    <div>
                        <FontAwesomeIcon icon={icon} className="profile-home__info-icon" style={{ color: color ? getColor(color) : '' }} />
                    </div>
                }
                on="hover"
                position="top center"
                mouseEnterDelay={200}
            >
                {name}
            </Popup>
            <span className="achievements__group-info-value">{info}</span>
        </p>
    );
};