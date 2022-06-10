import Popup from "reactjs-popup";
import { faHeadphones, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Soundtrack } from "../../../types";

import { HiddenAudio } from "../../common/HiddenAudio";
import { useHiddenAudio } from "../../../hooks/useHiddenAudio";

interface Props {
    soundtrack: Soundtrack;
}

export const AnimeOnTopAudio = ({ soundtrack }: Props) => {

    const { composer, likes, src, title } = soundtrack;

    const { audioRef, handleMusic, handleVolumeChange } = useHiddenAudio();

    return (
        <Popup
            className="normal-popup"
            trigger={
                <li className="anime-on-top__soundtrack">
                    <HiddenAudio audioRef={audioRef} src={src} />
                    <FontAwesomeIcon icon={faHeadphones} className="anime-on-top__soundtrack-icon" onClick={handleMusic} onWheel={handleVolumeChange} />
                </li>
            }
            on="hover"
            position="top center"
            offsetY={4}
        >
            <p className="anime-on-top__soundtrack-info">{composer} : "{title}""</p>
            <FontAwesomeIcon icon={faHeart} className="anime-on-top__soundtrack-stat-icon" />
            {likes.length}
        </Popup>
    );
};