import { Dispatch, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AnimeCondensedAPI, Kind, Sort, TypeAPI } from "../../../types";

import { Filter } from "./Filter";
import { AnimeElement } from "./AnimeElement";
import { Search } from "../../common/Search";
import { ResultsCount } from "../../common/ResultsCount";
import { Loading } from "../../common/Loading";

import { FormAction, formReducer } from "../../../reducers/formReducer";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { ANIME_LIMIT } from "../../../utils/dataLimit";
import { getData } from "../../../utils/getData";

export interface FiltersEntity {
    kind: Kind;
    maxRate: string;
    minRate: string;
    sort: Sort;
    unwantedTypes: string[];
    wantedTypes: string[];
}

const defaultFilter: FiltersEntity = {
    kind: 'all',
    maxRate: '',
    minRate: '',
    sort: 'alphabetic',
    unwantedTypes: [],
    wantedTypes: [],
};

export const Anime = () => {
    const componentRef = useRef<HTMLElement>(null);

    const [state, dispatch] = useReducer(formReducer, defaultFilter) as [FiltersEntity, Dispatch<FormAction>];
    const [types, setTypes] = useState<TypeAPI[] | null>(null);

    const { kind, maxRate, minRate, sort, unwantedTypes, wantedTypes } = state;

    const { amount, data, hasMore, loading, page, searchPhrase, handleSearchPhraseChange, setPage } = useSearch('anime', ANIME_LIMIT, { maxRate, minRate, sort, unwantedTypes, wantedTypes, kind }, [kind, maxRate, minRate, sort, unwantedTypes, wantedTypes]);

    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, ANIME_LIMIT, setPage);

    const animeList = () => {
        return (data as AnimeCondensedAPI[]).map((a, i) => <AnimeElement key={a._id} anime={a} place={i + 1} refference={(i + 1) % ANIME_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    const searchComponent = useMemo(() => <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="anime__search" />, [searchPhrase]);
    const filterComponent = useMemo(() => types ? <Filter dispatch={dispatch} state={state} types={types} /> : null, [state, types]);
    const animeListComponent = useMemo(() => data.length > 0 && types ? <ul className="anime__list">
        {animeList()}
    </ul> : null, [data, types]);

    useEffect(() => {
        getData('types/all', setTypes, componentRef);
    }, []);

    return (
        <main ref={componentRef} className="main__content home">
            {types ?
                <>
                    {searchComponent}
                    {filterComponent}
                    <ResultsCount amount={amount} value="Znalezione anime" className="anime__results-count" />
                    {animeListComponent}
                    {loading ? <Loading /> : null}
                </> :
                <Loading />}
        </main>
    );
};