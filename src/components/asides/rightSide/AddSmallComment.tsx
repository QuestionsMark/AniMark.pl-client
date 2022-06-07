import { KeyboardEvent, useState } from "react";
import { NewComment } from "../../../types";
import { useRightSide } from "../../../contexts/rightSideContext";
import { useSocket } from "../../../contexts/socketContext";
import { useUser } from "../../../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const AddSmallComment = () => {

    const { user, token } = useUser();
    const { socket } = useSocket();
    const { whatsTheMelodyResults } = useRightSide();

    const [text, setText] = useState('');

    const handleAddComment = async () => {
        if (user.logged && text.length !== 0 && text.length <= 250 && whatsTheMelodyResults) {
            if (!socket) return;
            socket.emit('new-comment', { collection: 'WHATS_THE_MELODY', collectionId: whatsTheMelodyResults._id, text, token } as NewComment);
            setText('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            handleAddComment();
        }
    };

    return (
        <div className="small-comment__add-comment">
            <div className="small-comment__add-comment-content">
                <textarea placeholder="Napisz komentarz..." className="form__textarea small-comment__textarea" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} maxLength={250} />
                <FontAwesomeIcon icon={faPaperPlane} className="small-comment__send-icon" onClick={handleAddComment} />
                <p className="small-comment__validation-text">( <span style={{ color: text.length === 0 || text.length > 500 ? '#d14141' : '#5ec45e' }}>{text.length}</span> ) max 250</p>
            </div>
        </div>
    );
};