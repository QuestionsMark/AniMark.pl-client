import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AudioPreview } from "../../types";
import { getColor, getSize } from "../../utils/previewHelper";
import { AudioComponent } from "../common/Audio";
import { DeleteButton } from "../common/DeleteButton";
import { IconButton } from "../common/IconButton";

interface Props {
    index: number;
    preview: AudioPreview;
    sizeLimit: number;
    dispatch: Dispatch<FormAction>;
}

export const SoundtrackPreviewElement = ({ index, preview, sizeLimit, dispatch }: Props) => {

    const { size, src } = preview;

    return (
        <li className="form__soundtrack-preview-item">
            <AudioComponent id={src} isStatic />
            <div className="form__soundtrack-preview-properties">
                <p className="form__soundtrack-preview-info">Rozmiar: <span className="image-preview-size" style={{ color: getColor(size, sizeLimit) }}>{getSize(size)}MB</span></p>
            </div>
            <DeleteButton handler={() => dispatch({ type: 'SOUNDTRACKS_DELETE', payload: index })} className="form__soundtrack-preview-delete-icon" />
            {index > 0 && <IconButton handler={() => dispatch({ type: 'SOUNDTRACKS_ORDER_CHANGE', payload: index })} icon={faCaretLeft} className="form__soundtrack-preview-order-icon" />}
        </li>
    );
};