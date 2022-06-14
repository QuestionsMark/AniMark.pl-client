import { Link } from "react-router-dom";
import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimeCondensedAPI } from "../../../types";

import { AnimeButtons } from "./AnimeButtons";
import { Image } from "../../common/Image";
import { TypeElement } from "../../common/TypeElement";

import { getKindIcon } from "../../../utils/getKindIcon";

interface Props {
    anime: AnimeCondensedAPI;
    place: number;
    refference?: (node: HTMLLIElement) => void;
}

export const AnimeElement = ({ anime, place, refference }: Props) => {
    const { _id, averageRate, image, kind, title, types } = anime;

    const typesList = () => {
        return types.map(t => <TypeElement key={t._id} type={t} />);
    };

    return (
        <li className="main__subsection anime__item" ref={refference ? refference : null}>
            <div className="anime__mobile-left">
                <p className="anime__place">{place <= 3 ? <FontAwesomeIcon icon={faTrophy} className="anime__place-icon" /> : place}</p>
                <div className="anime__mobile-rate">
                    <FontAwesomeIcon icon={faStar} className="anime__rate-icon" />
                    <p className="anime__value">{averageRate.toFixed(2)}</p>
                </div>
            </div>
            <div className="anime__img-wrapper">
                <Image alt={image.fromAnime} src={image.src} />
            </div>
            <div className="anime__informations">
                <Link to={`/anime/${_id}`} className="anime__title link">{title} {getKindIcon(kind, 'anime__kind-icon')}</Link>
                <div className="anime__types">
                    {typesList()}
                </div>
            </div>
            <div className="anime__rate">
                <FontAwesomeIcon icon={faStar} className="anime__rate-icon" />
                <p className="anime__value">{averageRate.toFixed(2)}</p>
            </div>
            <AnimeButtons animeId={_id} />
        </li>
    );
};