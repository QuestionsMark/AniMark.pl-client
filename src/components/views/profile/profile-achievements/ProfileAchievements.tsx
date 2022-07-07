import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../../hooks/useData";
import { useSearch } from "../../../../hooks/useSearch";
import { AchievementsGroup } from "../../../../types";
import { ACHIEVEMENTS_LIMIT } from "../../../../utils/dataLimit";
import { Loading } from "../../../common/Loading";
import { Search } from "../../../common/Search";
import { AchievementsGroupElement } from "../../achievements/AchievementsGroupElement";

export const ProfileAchievements = () => {

    const componentRef = useRef(null);
    const { userId } = useParams();

    const { data, handleSearchPhraseChange, loading, searchPhrase } = useSearch<AchievementsGroup>('achievements', ACHIEVEMENTS_LIMIT);
    const { data: userAchievements } = useData<string[]>(`users/${userId}/achievements`, componentRef);

    const achievementGroupsList = () => {
        return data.map(g => <AchievementsGroupElement key={g.name} group={g} userAchievements={userAchievements} userCheck />);
    };

    const achievementsGroupsListComponent = useMemo(() => data && userAchievements && <ul className="achievements__list">
        {achievementGroupsList()}
    </ul>, [data, userAchievements]);

    return (
        <div ref={componentRef} className="profile-achievements">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="achievements__search" />
            {achievementsGroupsListComponent}
            {loading && <Loading />}
        </div>
    );
};