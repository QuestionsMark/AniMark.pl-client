import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Popup from "reactjs-popup";
import { Color, getColor } from "../../../../utils/getColor";

interface Props {
    color?: Color;
    icon: IconDefinition;
    name: string;
    value: ReactNode;
}

export const ProfileInfoElement = ({ color, icon, name, value }: Props) => {
    return (
        <div className="profile-home__info">
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
            {value}
        </div>
    );
}