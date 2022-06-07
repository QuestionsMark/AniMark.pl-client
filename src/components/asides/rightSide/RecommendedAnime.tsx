import { faHeadphones, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRightSide } from "../../../contexts/rightSideContext";
import { useHiddenAudio } from "../../../hooks/useHiddenAudio";
import { RecommendedAnime as RecommendedAnimeAPI } from "../../../types";
import { getKindIcon } from "../../../utils/getKindIcon";
import { textHelper } from "../../../utils/textHelper";
import { HiddenAudio } from "../../common/HiddenAudio";
import { Image } from "../../common/Image";

export const RecommendedAnime = () => {

    const { recommendedAnime } = useRightSide();
    const { _id, averageRate, description, image, kind, likes, soundtrackSrc, title, types } = recommendedAnime as RecommendedAnimeAPI;

    const { audioRef, handleMusic, handleVolumeChange } = useHiddenAudio();

    const typeList = () => {
        return types.map(t => <li className="recommended-anime__item" key={t._id}><Link to={`/types/${t._id}`} className="recommended-anime__link"><p className="recommended-anime__type">{t.name}</p></Link></li>);
    };

    return (
        <section className="right-side__section recommended-anime">
            <HiddenAudio audioRef={audioRef} src={soundtrackSrc} />
            <h3 className="recommended-anime__title">Polecane Anime!</h3>
            <div className="recommended-anime__info">
                <div className="recommended-anime__left">
                    <div className="recommended-anime__img-wrapper">
                        <Image alt={image.fromAnime} src={image.src} />
                    </div>
                    <div className="recommended-anime__statistics">
                        <div className="recommended-anime__stat">
                            <FontAwesomeIcon icon={faStar} className="recommended-anime__icon special" />
                            <span className="recommended-anime__rateValue">{averageRate.toFixed(2)}</span>
                        </div>
                        <div className="recommended-anime__stat">
                            <FontAwesomeIcon icon={faHeart} className="recommended-anime__icon color" />
                            <span className="recommended-anime__rateValue">{likes.length}</span>
                        </div>
                    </div>
                </div>
                <div className="recommended-anime__right">
                    <Link to={`/anime/${_id}`} className="recommended-anime__anime-title">{title}{getKindIcon(kind, 'recommended-anime__kind-icon special')}</Link>
                    <ul className="recommended-anime__list">
                        {typeList()}
                    </ul>
                </div>
            </div>
            <div className="recommended-anime__description">{textHelper(description)}</div>
            <div className="recommended-anime__buttons">
                <Link to={`/anime/${_id}`} id="btn" className="recommended-anime__link recommended-anime__btn btn">Czytaj dalej</Link>
                <FontAwesomeIcon icon={faHeadphones} className="recommended-anime__music-icon" onClick={handleMusic} onWheel={handleVolumeChange} />
            </div>
        </section>
    );
};