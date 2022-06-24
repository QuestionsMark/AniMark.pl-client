import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, KeyboardEvent, SetStateAction, SyntheticEvent, useRef, useState } from "react";
import { usePopup } from "../../contexts/popupContext";
import { useUser } from "../../contexts/userContext";
import { Collection } from "../../types";
import { fetchTool } from "../../utils/fetchHelper";
import { getPath } from "../../utils/getCollection";
import { textMaxLengthHelper } from "../../utils/textHelper";
import { Image } from "./Image";

interface Props {
    collectionId: string;
    collection: Collection;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AddComment = ({ collection, collectionId, setRefresh }: Props) => {

    const { user } = useUser();
    const { setLoginPopup, setResponsePopup } = usePopup();

    const componentRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [text, setText] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!(e.code === 'Enter' && !e.shiftKey)) return;
        handleSubmit(e);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!text || text.length > 3000) return;
        if (!user.userId) return setLoginPopup({ message: '', open: true, status: false });
        setText('');
        const { message, status } = await fetchTool(getPath(collection, collectionId), 'POST', { text, userId: user.userId });
        if (!status) return setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <div ref={componentRef} className="comment__add">
            <div className="comment__add-avatar">
                <Image alt="Avatar" src={user?.data?.avatar || 'guest.png'} />
            </div>
            <form className="comment__add-form">
                <textarea ref={textareaRef} className="form__textarea comment__add-textarea" placeholder="Napisz komentarz..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} />
                <FontAwesomeIcon icon={faPaperPlane} className="comment__add-submit-icon" onClick={handleSubmit} />
                <p className="comment__add-validation-text">( <span style={{ color: textMaxLengthHelper(text, 3000) }}>{text.length}</span> ) max 3000</p>
            </form>
        </div>
    );
};