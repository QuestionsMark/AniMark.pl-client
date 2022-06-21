import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AnimeCreatePreview } from "../../types";
import { ImagePreviewElement } from "./ImagePreviewElement";

interface Props {
    className?: string;
    preview: AnimeCreatePreview;
    sizeLimit: number;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const AnimeCreateImagesPreviewFormPart = ({ dispatch, preview, sizeLimit, className, title }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Podgląd'}</h3>
            <ul className="form__anime-create-images-preview">
                <ImagePreviewElement dispatch={dispatch} index={0} preview={preview.background} sizeLimit={sizeLimit} />
                <ImagePreviewElement dispatch={dispatch} index={1} preview={preview.baner} sizeLimit={sizeLimit} />
                <ImagePreviewElement dispatch={dispatch} index={2} preview={preview.mini} sizeLimit={sizeLimit} />
            </ul>
        </div>
    );
};