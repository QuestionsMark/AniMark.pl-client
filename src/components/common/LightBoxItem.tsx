import { AnimeImage } from "../../types";
import { Image } from "./Image";
import { LightBoxActions } from "./LightBox";

interface Props {
    actions: LightBoxActions;
    image: AnimeImage;
}

export const LightBoxItem = ({ actions, image }: Props) => {
    const { changeIndex, actualIndex, index } = actions;
    const { fromAnime, src } = image;

    return (
        <li className={`lightbox__item${index === actualIndex ? ' active' : ''}`} onClick={() => index !== undefined ? changeIndex(index) : undefined}>
            <Image alt={fromAnime} src={src} />
        </li>
    );
};