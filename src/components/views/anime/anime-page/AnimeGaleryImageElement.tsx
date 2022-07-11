import { AnimeImage } from "../../../../types";
import { Image } from "../../../common/Image";

interface Props {
    img: AnimeImage;
}

export const AnimeGaleryImageElement = ({ img }: Props) => {

    const { fromAnime, src } = img;

    return (
        <li className="anime-page__images-item">
            <Image alt={fromAnime} src={src} className="img--natural img--radius" />
        </li>
    );
};