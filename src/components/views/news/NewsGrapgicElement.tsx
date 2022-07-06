import { Image } from "../../common/Image";

interface Props {
    src: string;
}

export const NewsGrapgicElement = ({ src }: Props) => {
    return (
        <li className="news-page__images-item">
            <Image alt="Artykuł" src={src} className="img--natural" />
        </li>
    );
};