import { Dispatch, SetStateAction } from "react";
import { AchievementAPI } from "../../../types";
import { Image } from "../../common/Image";

interface Props {
    achievement: AchievementAPI;
    isActive: boolean;
    isDone: boolean;
    setInfo: Dispatch<SetStateAction<AchievementAPI>>;
}

export const AchievementCircleElement = ({ achievement, isActive, isDone, setInfo }: Props) => {

    const { icon, name } = achievement;

    return (
        <li className={`achievements__group-item${isDone ? ' done' : ''}${isActive ? ' active' : ''}`} onClick={() => setInfo(achievement)}>
            <Image alt={name} src={icon} icon className="achievements__group-circle" />
        </li>
    );
};