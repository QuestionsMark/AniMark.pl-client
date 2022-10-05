import { AnimeImage } from "../../../types";
import { Image } from "../../common/Image";
import { LightBoxActions } from "../../common/LightBox";

interface Props {
    img: AnimeImage;
    actions?: LightBoxActions;
}

export const GaleryImageElement = ({ img, actions }: Props) => {
    const { fromAnime, src } = img;

    const handleClick = () => {
        if (!actions || actions?.index === undefined) return;
        const { open, changeIndex, index } = actions;
        changeIndex(index);
        open();
    };

    return (
        <li className="galery-page__item" onClick={handleClick}>
            <Image alt={fromAnime} src={src} className="img--natural img--radius" />
        </li>
    );
};