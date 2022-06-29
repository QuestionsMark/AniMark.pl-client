import { useRef } from "react";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { ComplexTypeAPI } from "../../../types";
import { TYPES_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { ComplexTypeElement } from "./ComplexTypeElement";

export const Types = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { amount, data, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch<ComplexTypeAPI>('types', TYPES_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, TYPES_LIMIT, setPage);

    const typesList = () => {
        if (!data) return;
        return data.map((t, i) => <ComplexTypeElement key={t._id} type={t} observer={(i + 1) % TYPES_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    return (
        <main ref={componentRef} className="main__content types">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="types__search" />
            {data && <ul className="types__list">
                {typesList()}
            </ul>}
            {loading && <Loading />}
        </main>
    );
};