import { Dispatch, SetStateAction } from "react";

export interface Page {
    prev: number | null;
    current: number;
    next: number | null;
}

export const defaultPage: Page = {
    current: 1,
    next: null,
    prev: null,
}

interface Props {
    page: Page;
    amount: number;
    limit: number;
    setPage: Dispatch<SetStateAction<Page>>
}

export const Pagination = ({ amount, limit, page, setPage }: Props) => {

    const handlePageChange = (page: number | null) => {
        if (!page) return;
        setPage({
            current: page,
            next: Math.floor(amount / limit) >= page + 1 ? page + 1 : null,
            prev: page - 1 > 0 ? page - 1 : null,
        });
    };

    return (
        <div className="pagination">
            {page.prev && <div className="pagination__btn" onClick={() => handlePageChange(page.prev)}>{page.prev}</div>}
            <div className="pagination__btn pagination__btn--current">{page.current}</div>
            {page.next && <div className="pagination__btn" onClick={() => handlePageChange(page.next)}>{page.next}</div>}
        </div>
    );
};