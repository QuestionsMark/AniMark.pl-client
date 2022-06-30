import { useSearch } from "../../../hooks/useSearch";
import { AchievementsGroup } from "../../../types";
import { ACHIEVEMENTS_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { AchievementsGroupElement } from "./AchievementsGroupElement";

export const Achievements = () => {

    const { data, handleSearchPhraseChange, loading, searchPhrase } = useSearch<AchievementsGroup>('achievements', ACHIEVEMENTS_LIMIT);

    const achievementGroupsList = () => {
        return data.map(g => <AchievementsGroupElement key={g.name} group={g} />);
    };

    return (
        <main className="main__content achievements">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="achievements__search" />
            <ul className="achievements__list">
                {achievementGroupsList()}
            </ul>
            {loading && <Loading />}
        </main>
    );
};