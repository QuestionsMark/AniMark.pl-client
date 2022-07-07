import { faHeart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { usePopup } from "../../contexts/popupContext";
import { useUser } from "../../contexts/userContext";
import { Collection, CommentPopulate } from "../../types";
import { fetchTool } from "../../utils/fetchHelper";
import { getPath } from "../../utils/getPath";
import { textHelper } from "../../utils/textHelper";
import { AdminOption } from "./AdminOption";
import { Image } from "./Image";

interface Props {
    comment: CommentPopulate;
    collectionId: string;
    collection: Collection;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const CommentElement = ({ collection, collectionId, comment, setRefresh }: Props) => {

    const { createdAt, id, likes, text, user: commentUser } = comment;

    const { user } = useUser();
    const { setResponsePopup, setLoginPopup } = usePopup();

    const isActive = () => {
        if (!user || !user.logged) return '';
        return likes.findIndex(l => l === user.userId) !== -1 ? ' active' : '';
    }

    const handleDelete = async () => {
        const { message, status } = await fetchTool(`${getPath(collection, collectionId)}/${id}`, 'DELETE');
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    const handleLikeClick = async () => {
        if (!user.userId) return setLoginPopup({ message: '', open: true, status: false });
        const { status } = await fetchTool(`${getPath(collection, collectionId)}/${id}/like/${user.userId}`, 'PUT');
        if (status) return setRefresh(state => state === null ? false : !state);
    };

    return (
        <li className="comment__item">
            <AdminOption handler={handleDelete} icon={faMinus} className="comment__admin-option" />
            <div className="comment__avatar">
                <Image alt={commentUser.username} src={commentUser.avatar} />
            </div>
            <div className="comment__content">
                <div className="comment__info">
                    <Link to={`/users/${commentUser._id}`} className="link comment__username">{commentUser.username}</Link>
                    <p className="comment__date">{formatDistanceToNow(new Date(createdAt))}</p>
                </div>
                <div className="text comment__text">
                    {textHelper(text)}
                </div>
                <div className="comment__like" onClick={handleLikeClick}>
                    <FontAwesomeIcon icon={faHeart} className={`comment__like-icon${isActive()}`} />
                    <p className="comment__like-value">{likes.length}</p>
                </div>
            </div>
        </li>
    );
};