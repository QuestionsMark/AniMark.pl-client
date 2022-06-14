import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import axios, { Canceler, AxiosError } from 'axios';
import { HOST_ADDRESS } from '../config';
import { getLocalStorage } from '../utils/localStorageHelper';
import { usePopup } from '../contexts/popupContext';
import { Data, Queries } from '../types';

export interface Page {
    prev: number | null;
    current: number;
    next: number | null;
}

export interface SearchResult {
    data: any;
    loading: boolean;
    hasMore: boolean;
    amount: number;
    page: number;
    // refresh: boolean;
    searchPhrase: string;
    handleSearchPhraseChange: (text: string) => void;
    setPage: Dispatch<SetStateAction<number>>;
    // setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const useSearch = (collection: string, limit: number, queries: Queries, dependencies: any[] = []): SearchResult => {

    const stringify = () => {
        return {
            ...queries,
            wantedTypes: queries.wantedTypes ? JSON.stringify(queries.wantedTypes) : undefined,
            unwantedTypes: queries.unwantedTypes ? JSON.stringify(queries.unwantedTypes) : undefined,
        };
    };

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const delayTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const { setResponsePopup } = usePopup();

    // const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [stringifyQueries, setstringifyQueries] = useState(stringify());
    const [search, setSearch] = useState('');
    const handleSearchPhraseChange = (text: string) => {
        setSearchPhrase(text);
    };


    useEffect(() => {
        setData([]);
        setLoading(true);
    }, [search, stringifyQueries]);
    // [search, stringifyQueries, refresh]

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setPage(1);
            setSearch(searchPhrase);
            if (JSON.stringify(stringifyQueries) !== JSON.stringify(stringify())) {
                setstringifyQueries(stringify());
            }
        }, 500);
        return clearTimeout();
    }, [searchPhrase, ...dependencies]);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data>([]);
    const [hasMore, setHasMore] = useState(false);
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        const startTime = new Date().valueOf();
        if (delayTimeoutId.current) {
            clearTimeout(delayTimeoutId.current);
        }
        if (data.length === 0) {
            setLoading(true);
        }
        let cancel: Canceler;
        axios({
            method: 'GET',
            url: `${HOST_ADDRESS}/${collection}`,
            params: {
                search: search,
                page: page,
                limit,
                ...stringifyQueries,
            },
            headers: { authorization: getLocalStorage('token') },
            cancelToken: new axios.CancelToken(c => cancel = c),
        })
            .then(res => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    setLoading(false);
                    setAmount(res.data.amount);
                    setData(prev => [...prev, ...res.data.results]);
                    setHasMore(res.data.results.length > 0);
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            })
            .catch((e: AxiosError) => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    if (axios.isCancel(e)) return;
                    setResponsePopup({ message: 'Zgibiłam się w drodze po Twoje dane.', status: false, open: true });
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            });

        return () => {
            if (delayTimeoutId.current) {
                clearTimeout(delayTimeoutId.current);
            }
            cancel();
        }

    }, [search, page, collection, stringifyQueries]);
    // [search, page, collection, stringifyQueries, refresh]

    return { loading, data, hasMore, amount, page, searchPhrase, setPage, handleSearchPhraseChange };
};