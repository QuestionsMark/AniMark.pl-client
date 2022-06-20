import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../../hooks/useSearch";
import { AnimeCondensedAPI, ProfileAnimeAPI, UserAnimeDataAnimeComdensedAPI, WatchedAnimeCondensedAPI } from "../../../../types";
import { PROFILE_ANIME_TOP_LIMIT } from "../../../../utils/dataLimit";
import { Loading } from "../../../common/Loading";
import { Search } from "../../../common/Search";
import { ProfileAnimeElement } from "./ProfileAnimeElement";

export const ProfileAnime = () => {

    const { userId } = useParams();

    const { amount, data, hasMore, loading, page, searchPhrase, setPage, handleSearchPhraseChange } = useSearch(`users/${userId}/anime-top`, PROFILE_ANIME_TOP_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, PROFILE_ANIME_TOP_LIMIT, setPage);

    const animeList = () => {
        return (data as ProfileAnimeAPI[]).map((a, i) => <ProfileAnimeElement key={a.anime._id} anime={a} place={i + 1} observer={(i + 1) % PROFILE_ANIME_TOP_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    const animeListComponent = useMemo(() => data.length > 0 ? <ul className="profile-anime__list">
        {animeList()}
    </ul> : null, [data]);

    return (
        <div className="profile-anime">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="profile-anime__search" />
            {animeListComponent}
            {loading && <Loading />}
        </div>
    );
};