import { useMemo, useRef } from "react";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useOpen } from "../../../hooks/useOpen";
import { useSearch } from "../../../hooks/useSearch";
import { NewsCondensedAPI } from "../../../types";
import { NEWS_LIMIT } from "../../../utils/dataLimit";
import { AddButton } from "../../common/AddButton";
import { FormPopup } from "../../common/FormPopup";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { NewsElement } from "./NewsElement";
import { NewsForm } from "./NewsForm";

export const News = () => {

    const componentRef = useRef<HTMLElement>(null);

    const { amount, data, hasMore, loading, page, searchPhrase, handleSearchPhraseChange, setPage, setRefresh } = useSearch('news', NEWS_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, NEWS_LIMIT, setPage);
    const { close, isOpen, open } = useOpen();

    const newsList = () => {
        return (data as NewsCondensedAPI[]).map((n, i) => <NewsElement key={n._id} news={n} observer={(i + 1) % NEWS_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    const searchComponent = useMemo(() => <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="news__search" />, [searchPhrase]);
    const newsListComponent = useMemo(() => data.length > 0 ? <ul className="news__list">
        {newsList()}
    </ul> : null, [data]);

    return (
        <main ref={componentRef} className="main__content news">
            <FormPopup close={close} form={<NewsForm close={close} setRefresh={setRefresh} />} isOpen={isOpen} trigger={<AddButton handler={open} className="news__add-icon" />} />
            {searchComponent}
            {newsListComponent}
            {loading && <Loading />}
        </main>
    );
};