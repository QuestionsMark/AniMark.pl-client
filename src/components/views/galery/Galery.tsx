import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { galeryAPI } from "../../../types";
import { GALERY_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { GaleryColumns } from "./GaleryColumns";

export interface Columns {
    column1: galeryAPI[];
    column2?: galeryAPI[];
    column3?: galeryAPI[];
    column4?: galeryAPI[];
}

export const Galery = () => {

    const timeOutId = useRef<NodeJS.Timeout | null>(null);
    const htmlRef = useRef(document.querySelector('html'));
    const windowRef = useRef(window);

    const { amount, data, hasMore, loading, page, searchPhrase, handleSearchPhraseChange, setPage } = useSearch<galeryAPI>('anime/galery', GALERY_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, GALERY_LIMIT, setPage);


    const [flag, setFlag] = useState(true);
    const [columns, setColumns] = useState<Columns | null>(null);

    const sortFolders = useCallback(() => {
        if (!htmlRef.current) return;
        const columns: Columns = { column1: [], column2: [], column3: [], column4: [] };
        let counter = 1;
        for (const folder of data) {
            (columns as any)[`column${counter}`].push(folder);
            if (htmlRef.current.clientWidth >= 780) {
                counter = counter === 4 ? 1 : counter + 1;
            }
            if (htmlRef.current.clientWidth >= 600 && htmlRef.current.clientWidth < 780) {
                counter = counter === 3 ? 1 : counter + 1;
            }
            if (htmlRef.current.clientWidth >= 500 && htmlRef.current.clientWidth < 600) {
                counter = counter === 2 ? 1 : counter + 1;
            }
        }
        setColumns(columns);
    }, [data]);

    const foldersListComponent = useMemo(() => data.length > 0 && columns && <GaleryColumns columns={columns} lastDataElementRef={lastDataElementRef} />, [columns, data.length, lastDataElementRef]);

    useEffect(() => {
        if (data.length > 0) {
            sortFolders();
        }
    }, [data, flag]);

    useEffect(() => {
        if (!windowRef.current) return;
        windowRef.current.addEventListener('resize', () => {
            if (timeOutId.current) {
                clearTimeout(timeOutId.current);
            }
            timeOutId.current = setTimeout(() => {
                setFlag(state => !state);
            }, 500);
        })
    }, []);

    return (
        <main className="main__content galery">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="galery__search" />
            {foldersListComponent}
            {loading && <Loading />}
        </main>
    );
};