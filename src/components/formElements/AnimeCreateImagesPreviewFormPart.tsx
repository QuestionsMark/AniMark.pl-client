import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AnimeCreatePreview } from "../../types";
import { AnimeCreateImagePreviewElement } from "./AnimeCreateImagePreviewElement";

interface Props {
    className?: string;
    preview: AnimeCreatePreview;
    sizeLimit: number;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const AnimeCreateImagesPreviewFormPart = ({ dispatch, preview, sizeLimit, className, title }: Props) => {

    const { background, baner, mini } = preview;

    return (
        <>
            {(background.src || baner.src || mini.src) && <div className={className ? className : ''}>
                <h3 className="form__subtitle">{title ? title : 'Podgląd'}</h3>
                <ul className="form__anime-create-images-preview">
                    {background.src && <AnimeCreateImagePreviewElement isStatic preview={background} sizeLimit={sizeLimit} title="Tło" />}
                    {baner.src && <AnimeCreateImagePreviewElement isStatic preview={baner} sizeLimit={sizeLimit} title="Baner" />}
                    {mini.src && <AnimeCreateImagePreviewElement isStatic preview={mini} sizeLimit={sizeLimit} title="Okładka" />}
                </ul>
            </div>}
        </>
    );
};