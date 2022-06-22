import { ImagePreview } from "../../types";
import { getColor, getSize } from "../../utils/previewHelper";
import { Image } from "../common/Image";

interface Props {
    preview: ImagePreview;
    sizeLimit: number;
    title: string;
}

export const AnimeCreateImagePreviewElement = ({ preview, sizeLimit, title }: Props) => {

    const { size, src } = preview;

    return (
        <li className="form__image-preview-item">
            <h3 className="form__anime-create-image-preview-title">{title}</h3>
            <div className="form__image-preview-img-wrapper">
                <Image alt="Podgląd" src={src} isStatic className="img--natural" />
            </div>
            <div className="form__image-preview-properties">
                <p className="form__image-preview-info">Rozmiar: <span className="image-preview-size" style={{ color: getColor(size, sizeLimit) }}>{getSize(size)}MB</span></p>
            </div>
        </li>
    );
};