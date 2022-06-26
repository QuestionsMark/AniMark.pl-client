import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../../../contexts/popupContext";
import { useUser } from "../../../../contexts/userContext";
import { Soundtrack } from "../../../../types";
import { fetchTool } from "../../../../utils/fetchHelper";
import { AudioComponent } from "../../../common/Audio";
import { IconButton } from "../../../common/IconButton";

interface Props {
    soundtrack: Soundtrack;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AnimeSoundtrackElement = ({ soundtrack, setRefresh }: Props) => {

    const { composer, id, likes, src, title } = soundtrack;

    const { user } = useUser();
    const { setLoginPopup, setResponsePopup } = usePopup();

    const { animeId } = useParams();

    const isActive = () => {
        if (!user.userId) return '';
        return likes.findIndex(l => l === user.userId) !== -1 ? 'active' : '';
    };

    const handleLike = async () => {
        if (!user.userId) return setLoginPopup({ message: '', open: true, status: false });
        const { message, status } = await fetchTool(`anime/${animeId}/soundtracks/${id}/like/${user.userId}`, 'PUT');
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <li className="anime-page__soundtracks-item">
            <AudioComponent id={src} />
            <p className="text anime-page__soundtracks-info">{composer} - "{title}"</p>
            <div className="anime-page__soundtracks-like">
                <FontAwesomeIcon icon={faHeart} className="anime-page__soundtracks-like-icon" />
                <p className="anime-page__soundtracks-like-value">{likes.length}</p>
            </div>
            <IconButton handler={handleLike} icon={faHeart} className={`anime-page__soundtracks-btn ${isActive()}`} />
        </li>
    );
};