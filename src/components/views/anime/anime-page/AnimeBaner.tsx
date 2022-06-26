import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackIosRounded, FullscreenRounded, PlayArrowRounded, PlayCircleOutlineRounded, VolumeUpRounded } from "@mui/icons-material";
import { useRef } from "react";
import { HOST_ADDRESS } from "../../../../config";
import { useUser } from "../../../../contexts/userContext";
import { AnimeImage, AnimeInfo, TypeAPI } from "../../../../types";

interface Props {
    averageRate: number;
    image: AnimeImage;
    info: AnimeInfo;
    likes: number;
    title: string;
    types: TypeAPI[];
    watchLink: string;
}

export const AnimeBaner = ({ averageRate, image, info, likes, title, types, watchLink }: Props) => {

    const layoutRef = useRef<HTMLDivElement>(null);

    const { user } = useUser();

    const isFavoriteType = () => types.findIndex(t => t._id === user.data?.favoriteType) !== -1;

    const handleMouseEnter = () => {
        if (!layoutRef.current) return;
        const icons = document.querySelectorAll('.page__baner-icon');
        layoutRef.current.classList.add('page__effect--hover');
        icons.forEach(i => {
            i.classList.add('page__baner-icon--hover');
        })
    };
    const handleMouseLeave = () => {
        if (!layoutRef.current) return;
        const icons = document.querySelectorAll('.page__baner-icon');
        layoutRef.current.classList.remove('page__effect--hover');
        icons.forEach(i => {
            i.classList.remove('page__baner-icon--hover');
        })
    };

    return (
        <div className="anime-page__baner" style={{ backgroundImage: `url('${HOST_ADDRESS}/media/${image.src}')` }}>
            <div className="anime-page__baner-layout" ref={layoutRef}>
                <a href={watchLink} target="_blank" rel="noreferrer" className="anime-page__baner-icon watch-link"><PlayCircleOutlineRounded className="watch-icon" /></a>
                <ArrowBackIosRounded className="anime-page__baner-icon corner1-icon" />
                <ArrowBackIosRounded className="anime-page__baner-icon corner2-icon" />
                <ArrowBackIosRounded className="anime-page__baner-icon corner3-icon" />
                <ArrowBackIosRounded className="anime-page__baner-icon corner4-icon" />
                <PlayArrowRounded className="anime-page__baner-icon play-icon" />
                <VolumeUpRounded className="anime-page__baner-icon volume-icon" />
                <div className="anime-page__baner-icon line-icon"></div>
                <div className="anime-page__baner-icon dot-icon"></div>
                <FullscreenRounded className="anime-page__baner-icon full-screen-icon" />
            </div>
            {isFavoriteType() ? <p className="anime-page__baner-recommend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>To anime może Ci się spodobać!</p> : null}
            <h3 className="anime-page__baner-title" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{title}</h3>
            <p className="anime-page__baner-info" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <span className="anime-page__baner-inf">{info.scenario}</span>
                <span className="anime-page__baner-inf">{info.productionYear}r.</span>
                <span className="anime-page__baner-inf">{info.duration}</span>
            </p>
            <div className="anime-page__baner-rate" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faStar} className="anime-page__baner-rate-icon" />
                <p className="anime-page__baner-rate-value">{averageRate.toFixed(2)}</p>
                <FontAwesomeIcon icon={faHeart} className="anime-page__baner-like-icon" />
                <p className="anime-page__baner-rate-value">{likes}</p>
            </div>
        </div>
    );
};