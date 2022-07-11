import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { ImagePreview } from "../../types";
import { ImagePreviewElement } from "./ImagePreviewElement";

interface Props {
    className?: string;
    preview: ImagePreview[];
    sizeLimit: number;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const ImagesPreviewFormPart = ({ className, preview, sizeLimit, title, dispatch }: Props) => {

    const previewList = () => {
        return preview.map((p, i) => <ImagePreviewElement key={p.src} preview={p} sizeLimit={sizeLimit} index={i} dispatch={dispatch} />);
    };

    return (
        <>
            {preview.length > 0 && <div className={className ? className : ''}>
                <h3 className="form__subtitle">{title ? title : 'Podgląd'}</h3>
                <ul className="form__image-preview-list">
                    {previewList()}
                </ul>
            </div>}
        </>
    );
};