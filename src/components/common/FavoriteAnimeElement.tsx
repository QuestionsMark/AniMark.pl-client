import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { HOST_ADDRESS } from "../../config";
import { UserAnimeDataAnimeComdensedAPI } from "../../types";

interface FavoriteAnimeElementAPI {
    anime: UserAnimeDataAnimeComdensedAPI;
    rate?: number;
}

interface Props {
    anime: FavoriteAnimeElementAPI;
    className?: string;
}

export const FavoriteAnimeElement = ({ anime, className }: Props) => {

    const { _id, image, title } = anime.anime;

    return (
        <Popup key={_id} className="normal-popup" position="top center" offsetY={2} on="hover" mouseEnterDelay={200} trigger={<Link to={`/anime/${_id}`} className={`favorite-anime${className ? ' ' + className : ''}`} style={{ backgroundImage: `url('${HOST_ADDRESS}/media/${image.src}')` }} />}>
            {title} {anime.rate ? <div className="favorite-anime-rate" ><FontAwesomeIcon icon={faStar} className="favorite-anime-icon" />{anime.rate}</div> : null}
        </Popup>
    );
};