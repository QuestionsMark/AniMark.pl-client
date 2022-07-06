import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { usePopup } from "../../contexts/popupContext";
import { FormAction } from "../../reducers/formReducer";
import { Soundtrack } from "../../types";
import { fetchTool } from "../../utils/fetchHelper";
import { AudioComponent } from "../common/Audio";
import { ConfirmIconButton } from "../common/ConfirmIconButton";
import { ComposerForm } from "./ComposerForm";
import { SoundtrackTitleForm } from "./SoundtrackTitleForm";

interface Props {
    soundtrack: Soundtrack;
    path: string;
    index: number;
    dispatch: Dispatch<FormAction>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const SavedSoundtrackFormElement = ({ dispatch, index, path, setRefresh, soundtrack }: Props) => {

    const { composer, id, likes, src, title } = soundtrack;

    const { setResponsePopup } = usePopup();

    const handleDelete = async () => {
        const { message, status } = await fetchTool(`${path}/soundtracks/${id}`, 'DELETE');
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <li className="form__soundtrack-preview-item">
            <AudioComponent id={src} />
            <div className="form__soundtrack-preview-section">
                <SoundtrackTitleForm dispatch={dispatch} index={index} value={title} />
                <ComposerForm dispatch={dispatch} index={index} value={composer} />
            </div>
            <ConfirmIconButton handler={handleDelete} icon={faMinus} question="Czy na pewno chcesz usunąć ten soundtrack?" className="form__saved-soundtracks-delete-icon" />
        </li>
    );
};