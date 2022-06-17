import { useMemo } from "react";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { UserCondensedAPI } from "../../../types";
import { USERS_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { UserElement } from "./UserElement";

export const Users = () => {

    const { amount, data, hasMore, loading, page, searchPhrase, handleSearchPhraseChange, setPage } = useSearch('users', USERS_LIMIT);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, USERS_LIMIT, setPage);

    const userList = () => {
        return (data as UserCondensedAPI[]).map((u, i) => <UserElement key={u._id} place={i + 1} user={u} observer={(i + 1) % USERS_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    const usersListComponent = useMemo(() => data.length > 0 && <ul className="users__list">
        {userList()}
    </ul>, [data.length]);

    return (
        <main className="main__content users">
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="users__search" />
            {usersListComponent}
            {loading && <Loading />}
        </main>
    );
};