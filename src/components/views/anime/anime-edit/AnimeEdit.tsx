import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../../contexts/userContext";
import { useData } from "../../../../hooks/useData";
import { useSearch } from "../../../../hooks/useSearch";
import { AnimeAPI, AnimeSeason, TypeFormListAPI } from "../../../../types";
import { getDuration } from "../../../../utils/durationHelper";
import { Loading } from "../../../common/Loading";
import { SmallNotFound } from "../../../common/SmallNotFound";
import { AnimeEditForm } from "./AnimeEditForm";

export const AnimeEdit = () => {
    const componentRef = useRef<HTMLElement>(null);
    const { animeId } = useParams();

    const { user } = useUser();

    const { data, setRefresh } = useData<AnimeAPI | null>(`anime/${animeId}`, componentRef, [animeId], true);
    const { data: types } = useData<TypeFormListAPI[]>('types/form', componentRef);
    const { data: seasons, amount, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch<AnimeSeason>('anime/seasons-form', 20);

    const getAnimeObject = () => {
        const { description, images, info, kind, seasons, soundtracks, title, types, watchLink } = (({ _id, comments, createdAt, likes, averageRate, rate, ...o }) => o)({ ...data as AnimeAPI });
        const { epizodeDuration, epizodesCount, hours, minutes } = getDuration(info.duration, kind);
        return {
            kind,
            title,
            animeDescription: description,
            scenario: info.scenario,
            productionYear: info.productionYear,
            epizodesCount,
            epizodeDuration,
            hours,
            minutes,
            watchLink,
            types: types.map((t: any) => t._id),
            seasons: seasons.map((s: any) => s._id),
            mini: null,
            background: null,
            baner: null,
            animeImagesPreview: {
                background: {
                    size: 0,
                    src: images.background.src,
                },
                baner: {
                    size: 0,
                    src: images.baner.src,
                },
                mini: {
                    size: 0,
                    src: images.mini.src,
                },
            },
            soundtracks: null,
            soundtracksPreview: [],
            savedImages: images,
            savedSoundtracks: soundtracks,
        };
    };

    return (
        <main ref={componentRef} className="main__content anime-edit">
            {data && seasons && types ? user.userId && [2].includes(user.rank) ? <AnimeEditForm
                anime={getAnimeObject()}
                seasons={seasons}
                types={types}
                setRefresh={setRefresh}
                amount={amount}
                handleSearchPhraseChange={handleSearchPhraseChange}
                hasMore={hasMore}
                loading={loading}
                page={page}
                searchPhrase={searchPhrase}
                setPage={setPage}
            /> : <SmallNotFound /> : <Loading />}
        </main>
    );
};