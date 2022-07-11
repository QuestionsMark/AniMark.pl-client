import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../../../contexts/popupContext";
import { useUser } from "../../../../contexts/userContext";
import { fetchTool } from "../../../../utils/fetchHelper";
import { IconButton } from "../../../common/IconButton";
import { Image } from "../../../common/Image";

interface Props {
    avatar: string;
    likes: string[];
    username: string;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const ProfileHeader = ({ likes, username, avatar, setRefresh }: Props) => {

    const { user } = useUser();
    const { setLoginPopup, setResponsePopup } = usePopup();
    const { userId } = useParams();

    const handleProfileLike = async () => {
        if (!user.userId) return setLoginPopup({ message: '', open: true, status: false });
        const { status, message } = await fetchTool(`users/${userId}/like/${user.userId}`, 'PUT');
        if (!status) return setResponsePopup({ message, open: true, status });
        return setRefresh(state => state === null ? false : !state);

    };

    return (
        <header className="profile-home__header">
            <div className="profile-home__avatar-container">
                <div className="profile-home__avatar">
                    <Image alt={username} src={avatar} />
                </div>
                <h2 className="profile-home__username">{username}</h2>
            </div>
            {user.userId !== userId && <div className="profile-home__like">
                <IconButton handler={handleProfileLike} icon={faHeart} className={`profile-home__like-icon${user && user.userId && likes.findIndex(l => l === user.userId) !== -1 ? ' active' : ''}`} />
            </div>}
        </header>
    );
}