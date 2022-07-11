import { useRef } from "react";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { WhatsTheMelodyAPI } from "../../../types";
import { WHATS_THE_MELODY_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { WhatsTheMelodyElement } from "./WhatsTheMelodyElement";

export const WhatsTheMelodyHistory = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { amount, data, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch<WhatsTheMelodyAPI>('whats-the-melody', WHATS_THE_MELODY_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, WHATS_THE_MELODY_LIMIT, setPage);

    const whatsTheMelodyList = () => {
        return data.map((w, i) => <WhatsTheMelodyElement key={w._id} wtm={w} observer={(i + 1) % WHATS_THE_MELODY_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    return (
        <main ref={componentRef} className="main__content whats-the-melody">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="whats-the-melody__search" />
            {data && <ul className="whats-the-melody__list">
                {whatsTheMelodyList()}    
            </ul>}
            {loading && <Loading />}
        </main>
    );
};