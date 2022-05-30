import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import axios, { Canceler, AxiosError } from 'axios';
import { HOST_ADDRESS } from '../config';
import { defaultPage, Page } from '../components/common/Pagination';
import { useScrollUp } from './useScrollUp';
import { Data } from '../types';

// export type Data = CardAPI[] | HashtagAPI[] | ProductAPI[] | ProductTypeAPI[] | CollectionAPI[] | PictureAPI[] | NewsAPI[];

export interface SearchResult {
    data: any;
    loading: boolean;
    page: Page;
    amount: number;
    searchPhrase: string;
    handleSearchPhraseChange: (text: string) => void;
    setPage: Dispatch<SetStateAction<Page>>;
}

export const useSearch = (
    collection: string,
    limit: number,
    hashtags: string[] | null = null,
    productType: string | null = null
): SearchResult => {

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const delayTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const [page, setPage] = useState<Page>(defaultPage);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [search, setSearch] = useState('');

    const handleSearchPhraseChange = (text: string) => {
        setSearchPhrase(text);
    };

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setPage(defaultPage);
            setSearch(searchPhrase);
        }, 500);
        return clearTimeout();
    }, [searchPhrase]);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data>([]);
    const [amount, setAmount] = useState(0);

    useScrollUp(page.current);

    useEffect(() => {
        setData([]);
        const startTime = new Date().valueOf();
        if (delayTimeoutId.current) {
            clearTimeout(delayTimeoutId.current);
        }
        setLoading(true);
        let cancel: Canceler;
        axios({
            method: 'GET',
            url: `${HOST_ADDRESS}/${collection}`,
            params: {
                search: search,
                page: page.current,
                limit,
            },
            cancelToken: new axios.CancelToken(c => cancel = c),
        })
            .then(res => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    setLoading(false);
                    setData(prev => [...prev, ...res.data.results]);
                    setAmount(res.data.amount);
                    setPage(prev => ({
                        current: prev.current,
                        next: Math.ceil(res.data.amount / 12) >= page.current + 1 ? page.current + 1 : null,
                        prev: page.current - 1 > 0 ? page.current - 1 : null,
                    }))
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            })
            .catch((e: AxiosError) => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    if (axios.isCancel(e)) return;
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            });
        return () => {
            if (delayTimeoutId.current) {
                clearTimeout(delayTimeoutId.current);
            }
            cancel();
        }

    }, [page.current, search]);

    return { loading, data, amount, page, searchPhrase, setPage, handleSearchPhraseChange };
};