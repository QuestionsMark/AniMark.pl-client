import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { ImagePreview } from "../../types";
import { getColor, getSize } from "../../utils/previewHelper";
import { DeleteButton } from "../common/DeleteButton";
import { IconButton } from "../common/IconButton";
import { Image } from "../common/Image";

interface Props {
    index: number;
    preview: ImagePreview;
    sizeLimit: number;
    dispatch: Dispatch<FormAction>;
}

export const ImagePreviewElement = ({ index, preview, sizeLimit, dispatch }: Props) => {

    const { size, src } = preview;

    return (
        <li className="form__image-preview-item">
            <div className="form__image-preview-img-wrapper">
                <Image alt="Podgląd" src={src} isStatic className="img--natural" />
            </div>
            <div className="form__image-preview-properties">
                <p className="form__image-preview-info">Rozmiar: <span className="image-preview-size" style={{ color: getColor(size, sizeLimit) }}>{getSize(size)}MB</span></p>
            </div>
            <DeleteButton handler={() => dispatch({ type: 'IMAGES_DELETE', payload: index })} className="form__image-preview-delete-icon" />
            {/* <DeleteButton className="form__image-preview-delete-btn" onlyIcon question="Na pewno usunąć tę grafikę?" handler={handleImageDelete}><FontAwesomeIcon icon={faMinus} /></DeleteButton> */}
            {index > 0 && <IconButton handler={() => dispatch({ type: 'IMAGES_ORDER_CHANGE', payload: index })} icon={faCaretLeft} className="form__image-preview-order-icon" />}
        </li>
    );
};