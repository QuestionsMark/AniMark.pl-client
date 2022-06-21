import { faBuildingColumns, faCalendarDay, faFireFlameCurved, faHeart, faMedal, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { differenceInCalendarDays } from "date-fns";
import { RoleEnum } from "../../../../types";
import { showRank } from "../../../../utils/showRank";
import { ProfileInfoElement } from "./ProfileInfoElement";

interface Props {
    achievements: number;
    createdAt: Date;
    favoriteType: string;
    likes: number;
    rank: RoleEnum;
    sumOfPoints: number;
    timeSpentWithAnime: number;
}

export const ProfileStatistics = ({ achievements, createdAt, favoriteType, likes, rank, sumOfPoints, timeSpentWithAnime }: Props) => {
    return (
        <section className="main__subsection profile-home__statistics">
            <ProfileInfoElement icon={faMedal} name="Punkty" value={sumOfPoints} color="SPECIAL" />
            <ProfileInfoElement icon={faHeart} name="Polubienia" value={likes} color="MAIN" />
            <ProfileInfoElement icon={faTrophy} name="Osiągnięcia" value={achievements} color="SPECIAL" />
            <ProfileInfoElement icon={faFireFlameCurved} name="Ulubiony Gatunek" value={favoriteType} color="ORANGE" />
            <ProfileInfoElement icon={faCalendarDay} name="Ilość dni od założenia konta" value={differenceInCalendarDays(new Date(), new Date(createdAt))} color="WHITE" />
            <ProfileInfoElement icon={faBuildingColumns} name="Ranga" value={showRank(rank)} color="WHITE" />
            <div className="profile-home__info profile-home__info--time">
                Łączny czas oglądania: {`${Math.floor(timeSpentWithAnime / 60)}godz. ${timeSpentWithAnime % 60}min.`}
            </div>
        </section>
    );
};