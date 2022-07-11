import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { TypePageAPI } from "../../../types";
import { textHelper } from "../../../utils/textHelper";
import { FavoriteAnimeElement } from "../../common/FavoriteAnimeElement";
import { TypeLoverElement } from "./TypeLoverElement";

export const TypePage = () => {

    const componentRef= useRef<HTMLElement>(null);

    const { typeId } = useParams();
    const { data } = useData<TypePageAPI>(`types/${typeId}`, componentRef, [typeId], true);

    const loversList = () => {
        return data.lovers.map(l => <TypeLoverElement key={l._id} lover={l} />);
    };

    const bestAnimeList = () => {
        return data.bestAnime.map(a => <FavoriteAnimeElement anime={{ anime: a.anime, rate: a.rate }} />);
    };

    return (
        <main ref={componentRef} className="main__content type-page">
            {data && <>
                <h2 className="type-page__title">{data.name}</h2>
                <div className="type-page__content">
                    <p className="main__subsection text text--indent type-page__description">{textHelper(data.description)}</p>
                    <div className="main__subsection types__list-container">
                        <h3 className="types__subtitle">Miłośnicy gatunku</h3>
                        {<ul className="types__sublist">{data.lovers.length > 0 ? loversList() : 'Brak'}</ul>}
                    </div>
                    <div className="main__subsection types__list-container">
                        <h3 className="types__subtitle">Top anime z tym gatunkiem</h3>
                        {<ul className="types__sublist">{data.bestAnime.length > 0 ? bestAnimeList() : 'Brak'}</ul>}
                    </div>
                </div>
            </>}
        </main>
    );
};