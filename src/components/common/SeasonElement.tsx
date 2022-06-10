import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { AnimeSeason } from "../../types";
import { Image } from "./Image";

interface Props {
    season: AnimeSeason;
}

export const SeasonElement = ({ season }: Props) => {

    const { _id, image, title } = season;

    return (
        <Popup
            className="normal-popup"
            trigger={
                <Link to={`/anime/${_id}`} className="season__link">
                    <li className="season__item">
                        <div className="season__img-wrapper">
                            <Image alt={image.fromAnime} src={image.src} />
                        </div>
                    </li>
                </Link>
            }
            on="hover"
            position="top center"
            offsetY={5}
            offsetX={-6}
        >
            {title}
        </Popup>
    );
};