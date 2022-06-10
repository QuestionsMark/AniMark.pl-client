import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHome } from "../../../contexts/homeContext";
import { AnimeOnTopPopulateAPI, AnimeOnTopWinnerAPI } from "../../../types";
import { textHelper } from "../../../utils/textHelper";
import { Image } from "../../common/Image";
import { SeasonElement } from "../../common/SeasonElement";
import { TypeElement } from "../../common/TypeElement";
import { AnimeOnTopAudio } from "./AnimeOnTopAudio";

export const AnimeOnTopWinner = () => {

    const { animeOnTop } = useHome();
    const { winner } = animeOnTop as AnimeOnTopPopulateAPI;
    const { _id, averageRate, description, image, likes, soundtracks, seasons, title, types } = winner as AnimeOnTopWinnerAPI;
    const { _id: userId, username } = description.author;

    const typesList = () => {
        return types.map(t => <TypeElement key={t._id} type={t} />);
    };

    const seasonsList = () => {
        return seasons.map(s => <SeasonElement key={s._id} season={s} />);
    };

    const soundtracksList = () => {
        return soundtracks.map(s => <AnimeOnTopAudio key={s.id} soundtrack={s} />);
    };

    return (
        <div className="main__subsection anime-on-top__winner">
            <div className="anime-on-top__anime-content">
                <div className="anime-on-top__left">
                    <div className="anime-on-top__img-wrapper">
                        <Image alt={image.fromAnime} src={image.src} />
                    </div>
                    <div className="anime-on-top__statistics">
                        <FontAwesomeIcon icon={faStar} className="anime-on-top__statistics-icon special" />
                        <p className="anime-on-top__value">{(averageRate).toFixed(2)}</p>
                        <FontAwesomeIcon icon={faHeart} className="anime-on-top__statistics-icon color" />
                        <p className="anime-on-top__value">{likes}</p>
                    </div>
                </div>
                <div className="anime-on-top__right">
                    <Link to={`/anime/${_id}`} className="anime-on-top__anime-title link">{title}</Link>
                    <div className="anime-on-top__types">
                        {typesList()}
                    </div>
                    <div className="anime-on-top__description">
                        <div className="anime-on-top__description-text text--indent">{textHelper(description.description)}</div>
                        <Link to={`/users/${userId}`} className="anime-on-top__description-author link">{username}</Link>
                    </div>
                </div>
            </div>
            <div className="anime-on-top__bottom">
                {soundtracks.length > 0 && <div className="anime-on-top__soundtracks">
                    <h3 className="anime-on-top__subtitle">Soundtracki:</h3>
                    <ul className="anime-on-top__list">
                        {soundtracksList()}
                    </ul>
                </div>}
                {seasons.length > 0 && <div className="anime-on-top__seasons">
                    <h3 className="anime-on-top__subtitle">Powiązane anime:</h3>
                    <ul className="anime-on-top__list">
                        {seasonsList()}
                    </ul>
                </div>}
            </div>
        </div>
    );
};