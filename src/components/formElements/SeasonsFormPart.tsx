import { Checkbox, FormControlLabel } from "@mui/material";
import { Dispatch, SetStateAction, useMemo } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AnimeForm } from "../../types";
import { SEASONS_TO_CHOOSE_LIMIT } from "../../utils/dataLimit";
import { AddButton } from "../common/AddButton";
import { LoadingWithMargin } from "../common/LoadingWithMargin";
import { Search } from "../common/Search";

interface Props {
    amount: number;
    hasMore: boolean;
    loading: boolean;
    page: number;
    searchPhrase: string;
    seasons: AnimeForm[];
    value: string[];
    className?: string;
    title?: string;
    handleSearchPhraseChange: (text: string) => void;
    setPage: Dispatch<SetStateAction<number>>;
    dispatch: Dispatch<FormAction>;
}

export const SeasonsFormPart = ({ amount, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, seasons, setPage, value, className, title, dispatch }: Props) => {

    const isChecked = (season: string) => {
        return value.findIndex(s => s === season) !== -1;
    };

    const seasonsList = () => {
        return seasons.map(s => <FormControlLabel
            key={s._id}
            control={
                <Checkbox checked={isChecked(s._id)} value={s._id} onChange={(e) => dispatch({ type: 'SEASONS_CHANGE', payload: e.target.value })} />
            }
            label={s.title}
        />);
    };

    const seasonsComponent = useMemo(() => <ul className="form__seasons-list">
        {seasonsList()}
        {!loading && hasMore && amount > SEASONS_TO_CHOOSE_LIMIT * page && <AddButton handler={() => setPage(state => state + 1)} className="form__seasons-more" />}
    </ul>, [value, seasons]);

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Sezony / Powiązane anime'}</h3>
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="form__seasons-search" />
            {seasonsComponent}
            {loading && <LoadingWithMargin marginHorizontal={0} marginVertical={50} />}
        </div>
    );
};