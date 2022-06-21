import { Dispatch, SetStateAction } from "react";
import { ProfileAPI } from "../../../../types";
import { ProfileAnimeData } from "./ProfileAnimeData";
import { ProfileFavoriteAnime } from "./ProfileFavoriteAnime";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileIntroduction } from "./ProfileIntroduction";
import { ProfileStatistics } from "./ProfileStatistics";

interface Props {
    profile: ProfileAPI;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const ProfileHome = ({ profile, setRefresh }: Props) => {

    const { achievements, avatar, createdAt, favoriteAnime, favoriteType, introduction, likes, points, rank, sumOfPoints, userAnimeData, username, timeSpentWithAnime } = profile;

    return (
        <div className="profile-home">
            <ProfileHeader avatar={avatar} likes={likes} username={username} setRefresh={setRefresh} />
            <div className="profile-home__main">
                <ProfileStatistics
                    achievements={achievements.length}
                    createdAt={createdAt}
                    favoriteType={favoriteType ? favoriteType.name : 'Brak'}
                    likes={likes.length}
                    rank={rank}
                    sumOfPoints={sumOfPoints}
                    timeSpentWithAnime={timeSpentWithAnime}
                />
                <ProfileIntroduction introduction={introduction} />
                <ProfileFavoriteAnime favoriteAnime={favoriteAnime} />
                <ProfileAnimeData userAnimeData={userAnimeData} />
            </div>
        </div>
    );
};