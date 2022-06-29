import { useState } from "react";
import Popup from "reactjs-popup";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useSearch } from "../../../hooks/useSearch";
import { CityDefenceAPI, CityDefenceSort } from "../../../types";
import { RANKING_LIMIT } from "../../../utils/dataLimit";
import { Loading } from "../../common/Loading";
import { Search } from "../../common/Search";
import { CityDefenceResultElement } from "./CityDefenceResultElement";

export const CityDefence = () => {

    const [sort, setSort] = useState<CityDefenceSort>('overall');
    const handleChangeSort = (newSort: CityDefenceSort) => {
        if (newSort === sort) return;
        setSort(newSort);
        setPage(1);
    };

    const { amount, data, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch<CityDefenceAPI>('city-defence', RANKING_LIMIT, { rankingSort: sort }, [sort]);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, RANKING_LIMIT, setPage);

    const resultsList = () => {
        return data.map((r, i) => <CityDefenceResultElement key={r._id} result={r} place={i + 1} observer={(i + 1) % RANKING_LIMIT === 0 ? lastDataElementRef : undefined} />);
    };

    return (
        <main className="main__content city-defence">
            <header className="ranking__header">
                <h2 className="main__title ranking__title">City Defence Ranking</h2>
                <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="ranking__search" />
            </header>
            <div className="ranking__content">
                <div className="ranking__legend">
                    <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item city-defence__legend-item ${sort === 'overall' ? 'active' : ''}`} onClick={() => handleChangeSort('overall')}>Miejsce</p>}>
                        Sortowanie overall.
                    </Popup>
                    <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item city-defence__legend-item ${sort === 'username' ? 'active' : ''}`} onClick={() => handleChangeSort('username')}>Użytkownik</p>}>
                        Sortowanie po nazwie.
                    </Popup>
                    <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item city-defence__legend-item ${sort === 'points' ? 'active' : ''}`} onClick={() => handleChangeSort('points')}>Pynkty</p>}>
                        Sortowanie po punktacji.
                    </Popup>
                    <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item city-defence__legend-item ${sort === 'accuracy' ? 'active' : ''}`} onClick={() => handleChangeSort('accuracy')}>Celność</p>}>
                        Sortowanie po celności.
                    </Popup>
                    <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`ranking__legend-item city-defence__legend-item ${sort === 'date' ? 'active' : ''}`} onClick={() => handleChangeSort('date')}>Data</p>}>
                        Sortowanie po dacie.
                    </Popup>
                </div>
                {data.length > 0 && <ul className="ranking__list">{resultsList()}</ul>}
                {loading && <Loading />}
            </div>
        </main>
    );
};