import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { AnimeSeason } from "../../types";
import { Image } from "./Image";

interface FavoriteAnimeElementAPI {
    anime: AnimeSeason;
    rate?: number;
}

interface Props {
    anime: FavoriteAnimeElementAPI;
    className?: string;
}

export const AnimeBrickElement = ({ anime, className }: Props) => {
    const { _id, image, title } = anime.anime;

    return (
        <Popup
            key={_id}
            className="normal-popup"
            position="top center"
            offsetY={2}
            on="hover"
            mouseEnterDelay={200}
            trigger={
                <Link
                    to={`/anime/${_id}`}
                    className={`anime-brick${className ? ' ' + className : ''}`}
                >
                    <Image alt={title} src={image.src} className="img--fit" />
                </Link>
            }
        >
            {title} {anime.rate ? <div className="anime-brick__rate" >
                <FontAwesomeIcon icon={faStar} className="anime-brick__icon" />
                {anime.rate}
            </div> : null}
        </Popup>
    );
};