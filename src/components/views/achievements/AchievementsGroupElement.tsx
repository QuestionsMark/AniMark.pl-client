import { faAward, faMedal, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AchievementAPI, AchievementsGroup } from "../../../types";
import { textHelper } from "../../../utils/textHelper";
import { AchievementCircleElement } from "./AchievementCircleElement";
import { AchievementsStatisticElement } from "./AchievementsStatisticElement";

interface Props {
    group: AchievementsGroup;
}

export const AchievementsGroupElement = ({ group }: Props) => {

    const { items, name } = group;

    const [info, setInfo] = useState<AchievementAPI>(items[0]);

    const achievementsList = () => {
        return items.map(a => <AchievementCircleElement key={a._id} achievement={a} isActive={info._id === a._id} setInfo={setInfo} />);
    };

    return (
        <section className="main__subsection achievements__group">
            <h2 className="achievements__group-title">{name}</h2>
            <ul className="achievements__group-list">
                {achievementsList()}
            </ul>
            <div className="achievements__group-content">
                <div className="text achievements__group-description">
                    {textHelper(info.description)}
                </div>
                <div className="achievements__group-informations">
                    <AchievementsStatisticElement color="WHITE" icon={faRankingStar} info={info.level} name="Poziom osiągnięcia" />
                    <AchievementsStatisticElement color="ORANGE" icon={faAward} info={info.title} name="Tytuł" />
                    <AchievementsStatisticElement color="SPECIAL" icon={faMedal} info={info.points} name="Punkty" />
                </div>
            </div>
        </section>
    );
};