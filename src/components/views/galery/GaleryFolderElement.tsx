import { Link } from "react-router-dom";
import { galeryAPI } from "../../../types";
import { Image } from "../../common/Image";

interface Props {
    folder: galeryAPI;
    observer?: (node: any) => void;
}

export const GaleryFolderElement = ({ folder, observer }: Props) => {

    const { _id, images, title } = folder;

    return (
        <Link to={`/galery/${_id}`} ref={observer ? observer : null} className="galery__folder-link">
            <li className="galery__folder-item">
                <div className="galery__folder-img-wrapper">
                    <Image alt={images[0].fromAnime} src={images[0].src} className="img--natural galery__img" />
                </div>
                <h2 className="galery__folder-title">{title}</h2>
            </li>
        </Link>
    );
};