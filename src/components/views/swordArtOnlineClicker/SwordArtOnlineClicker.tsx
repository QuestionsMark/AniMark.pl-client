import { useState } from "react";
import Popup from "reactjs-popup";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { SAOCSort, SwordArtOnlineResultAPI } from "../../../types";
import { RANKING_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { SwordArtOnlineClickerResultElement } from "./SwordArtOnlineClickerResultElement";

export const SwordArtOnlineClicker = () => {

    const [sort, setSort] = useState<SAOCSort>('time');
    const handleChangeSort = (newSort: SAOCSort) => {
        if (newSort === sort) return;
        setSort(newSort);
        setPage(1);
    };

    const { amount, data, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch<SwordArtOnlineResultAPI>('sword-art-online-clicker', RANKING_LIMIT, { rankingSort: sort }, [sort]);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, RANKING_LIMIT, setPage);

    const resultsList = () => {
        return data.map((r, i) => <SwordArtOnlineClickerResultElement key={r._id} result={r} place={i + 1} observer={(i + 1) % RANKING_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    return (
        <main className="main__content ranking">
            <header className="ranking__header">
                <h2 className="main__title ranking__title">Sword Art Online Clicker Ranking</h2>
                <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="ranking__search" />
            </header>
            <div className="ranking__content">
                {data.length > 0 && <>
                    <div className="ranking__legend">
                        <p className="ranking__legend-item">Miejsce</p>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item sword-art-online-clicker__item ${sort === 'username' ? 'active' : ''}`} onClick={() => handleChangeSort('username')}>Użytkownik</p>}>
                            Sortowanie po użytkowniku.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item sword-art-online-clicker__item ${sort === 'time' ? 'active' : ''}`} onClick={() => handleChangeSort('time')}>Czas</p>}>
                            Sortowanie po czasie ukończenia.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item sword-art-online-clicker__item ${sort === 'level' ? 'active' : ''}`} onClick={() => handleChangeSort('level')}>Poziom</p>}>
                            Sortowanie po poziomie.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item sword-art-online-clicker__item ${sort === 'achievements' ? 'active' : ''}`} onClick={() => handleChangeSort('achievements')}>Osiągnięcia</p>}>
                            Sortowanie po ilości osiągnięć.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item sword-art-online-clicker__item ${sort === 'swords' ? 'active' : ''}`} onClick={() => handleChangeSort('swords')}>Ilość Mieczy</p>}>
                            Sortowanie po ilości zakupionych mieczy.
                        </Popup>
                    </div>
                    <ul className="ranking__list">{resultsList()}</ul>
                </>}
                {loading && <Loading />}
            </div>
        </main>
    );
};