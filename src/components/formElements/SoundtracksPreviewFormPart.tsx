import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AudioPreview } from "../../types";
import { SoundtrackPreviewElement } from "./SoundtrackPreviewElement";

interface Props {
    className?: string;
    preview: AudioPreview[];
    sizeLimit: number;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const SoundtracksPreviewFormPart = ({ className, preview, sizeLimit, title, dispatch }: Props) => {

    const previewList = () => {
        return preview.map((p, i) => <SoundtrackPreviewElement key={p.src} preview={p} sizeLimit={sizeLimit} index={i} dispatch={dispatch} />);
    };

    return (
        <>
            {preview.length > 0 && <div className={className ? className : ''}>
                <h3 className="form__subtitle">{title ? title : 'Podgląd'}</h3>
                <ul className="form__soundtrack-preview-list">
                    {previewList()}
                </ul>
            </div>}
        </>
    );
};