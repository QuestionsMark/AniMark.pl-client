import { AnimeImage } from "../../../types";
import { Image } from "../../common/Image";

interface Props {
    img: AnimeImage;
}

export const GaleryImageElement = ({ img }: Props) => {
    const { fromAnime, src } = img;
    return (
        <li className="galery-page__item">
            <Image alt={fromAnime} src={src} className="img--natural img--radius" />
        </li>
    );
};