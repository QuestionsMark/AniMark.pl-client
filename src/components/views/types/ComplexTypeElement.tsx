import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ComplexTypeAPI } from "../../../types";
import { FavoriteAnimeElement } from "../../common/FavoriteAnimeElement";
import { TypeLoverElement } from "./TypeLoverElement";

interface Props {
    type: ComplexTypeAPI;
    observer?: (node: any) => void;
}

export const ComplexTypeElement = ({ type, observer }: Props) => {

    const { _id, animeCount, bestAnime, lovers, name } = type;

    const loversList = () => {
        return lovers.map(l => <TypeLoverElement key={l._id} lover={l} />);
    };

    const bestAnimeList = () => {
        return bestAnime.map(a => <FavoriteAnimeElement anime={{ anime: a.anime, rate: a.rate }} />);
    };

    return (
        <li ref={observer || null} className="main__subsection types__itme">
            <div className="types__info">
                <Link to={`/types/${_id}`} className="link types__link">{name}</Link>
                <p className="types__count">Ilosc anime: {animeCount}</p>
                <div className="types__like">
                    <FontAwesomeIcon icon={faHeart} className="types__like-icon" />
                    <p className="types__like-value">{lovers.length}</p>
                </div>
            </div>
            <div className="types__lists">
                <div className="types__list-container">
                    <h3 className="types__subtitle">Miłośnicy gatunku</h3>
                    {<ul className="types__sublist">{lovers.length > 0 ? loversList() : 'Brak'}</ul>}
                </div>
                <div className="types__list-container">
                    <h3 className="types__subtitle">Top anime z tym gatunkiem</h3>
                    {<ul className="types__sublist">{bestAnime.length > 0 ? bestAnimeList() : 'Brak'}</ul>}
                </div>
            </div>
        </li>
    );
};  