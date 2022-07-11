import { faHeart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useRightSide } from "../../../contexts/rightSideContext";
import { useSocket } from "../../../contexts/socketContext";
import { useUser } from "../../../contexts/userContext";
import { CommentPopulate, UpdateComment } from "../../../types";
import { AdminOption } from "../../common/AdminOption";
import { Image } from "../../common/Image";

interface Props {
    comment: CommentPopulate;
}

export const SmallComment = ({ comment }: Props) => {

    const { id, createdAt, likes, text, user: commentUser } = comment;
    const { _id, avatar, username } = commentUser;

    const { user, token } = useUser();
    const { socket } = useSocket();
    const { whatsTheMelodyResults } = useRightSide();

    const isActive = () => {
        if (likes.findIndex(l => l === user.userId) !== -1) return 'active';
        return '';
    }

    const handleLikeClick = async () => {
        if (user.logged && whatsTheMelodyResults) {
            if (!socket) return;
            socket.emit('new-comment-like', { collection: 'WHATS_THE_MELODY', collectionId: whatsTheMelodyResults._id, commentId: id, token } as UpdateComment);
        }
    };

    const handleCommentDelete = async () => {
        if (user.logged && whatsTheMelodyResults) {
            if (!socket) return;
            socket.emit('comment-delete', { collection: 'WHATS_THE_MELODY', collectionId: whatsTheMelodyResults._id, commentId: id, token } as UpdateComment);
        }
    };

    return (
        <li className="small-comment__item">
            <div className="small-comment__img-wrapper">
                <Image alt={username} src={avatar} />
            </div>
            <div className="small-comment__comment-content">
                <div className="small-comment__comment-info">
                    <Link to={`/users/${_id}`} className="small-comment__nick link">{username}</Link>
                    <small className="small-comment__date">{formatDistanceToNow(new Date(createdAt))}</small>
                </div>
                <p className="text small-comment__text">{text}</p>
                <div className="small-comment__like" onClick={handleLikeClick}>
                    <FontAwesomeIcon icon={faHeart} className={`small-comment__like-icon ${isActive()}`} />
                    <p className="small-comment__like-amount">{likes.length}</p>
                </div>
                <AdminOption handler={handleCommentDelete} icon={faMinus} className="small-comment__admin-option" />
            </div>
        </li>
    );
};