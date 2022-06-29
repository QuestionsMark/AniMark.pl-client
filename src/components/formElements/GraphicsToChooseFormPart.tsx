import { Dispatch } from "react";
import { useSearch } from "../../hooks/useSearch";
import { FormAction } from "../../reducers/formReducer";
import { AnimeImage } from "../../types";
import { IMAGES_TO_CHOOSE_LIMIT } from "../../utils/dataLimit";
import { AddButton } from "../common/AddButton";
import { LoadingWithMargin } from "../common/LoadingWithMargin";
import { Search } from "../common/Search";
import { ChooseGraphicElement } from "./ChooseGraphicElement";

interface Props {
    title?: string;
    className?: string;
    value: string[];
    graphicsCount: number;
    dispatch: Dispatch<FormAction>;
}

export const GraphicsToChooseFormPart = ({ className, graphicsCount, title, value, dispatch }: Props) => {

    const { amount, data, hasMore, loading, page, searchPhrase, setPage, handleSearchPhraseChange } = useSearch<AnimeImage>('anime/images-form', IMAGES_TO_CHOOSE_LIMIT);

    const isActive = (src: string) => {
        return value.findIndex(s => s === src) !== -1;
    }

    const graphicsToChoose = () => {
        return data.map(i => <ChooseGraphicElement key={i.src} active={isActive(i.src)} dispatch={dispatch} graphicsCount={graphicsCount} image={i} />);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Wybierz grafiki'}</h3>
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} className="form__graphics-to-choose-search" />
            <ul className="form__graphics-to-choose-list">
                {graphicsToChoose()}
                {!loading && hasMore && amount > IMAGES_TO_CHOOSE_LIMIT * page && <AddButton handler={() => setPage(state => state + 1)} className="form__graphics-to-choose-more" />}
            </ul>
            {loading && <LoadingWithMargin marginHorizontal={0} marginVertical={100} />}
        </div>
    );
};