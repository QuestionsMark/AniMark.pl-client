import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../../hooks/useData";
import { ProfileAnimeAPI, TypeAPI } from "../../../../types";
import { getKindIcon } from "../../../../utils/getKindIcon";
import { Image } from "../../../common/Image";
import { TypeElement } from "../../../common/TypeElement";

interface Props {
    anime: ProfileAnimeAPI;
    place: number;
    observer?: (node: HTMLLIElement) => void;
}

export const ProfileAnimeElement = ({ anime, place, observer }: Props) => {

    const { _id, image, kind, title } = anime.anime;

    const componentRef = useRef<HTMLDivElement>(null);

    const { data } = useData<TypeAPI[]>(`anime/${_id}/types`, componentRef);

    const typesList = () => {
        if (!data) return null;
        return data.map(t => <TypeElement key={t._id} type={t} />);
    };

    return (
        <li ref={observer || null} className="main__subsection anime__item">
            <div ref={componentRef} className="anime__mobile-left">
                <p className="anime__place">{place <= 3 ? <FontAwesomeIcon icon={faTrophy} className="anime__place-icon" /> : place}</p>
                <div className="anime__mobile-rate">
                    <FontAwesomeIcon icon={faStar} className="anime__rate-icon" />
                    <p className="anime__value">{anime.rate.toFixed(2)}</p>
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
                <p className="anime__value">{anime.rate.toFixed(2)}</p>
            </div>
        </li>
    );
};