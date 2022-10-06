import { Image } from "../../common/Image";
import { LightBoxActions } from "../../common/LightBox";

interface Props {
    src: string;
    actions?: LightBoxActions;
}

export const NewsGrapgicElement = ({ src, actions }: Props) => {
    const handleClick = () => {
        if (!actions || actions?.index === undefined) return;
        const { open, changeIndex, index } = actions;
        changeIndex(index);
        open();
    };
    
    return (
        <li className="news-page__images-item" onClick={handleClick}>
            <Image alt="Artykuł" src={src} className="img--natural img--radius" />
        </li>
    );
};