import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { HOST_ADDRESS } from "../../../config";
import { FavoriteAnimeCondensed } from "../../../types";

interface Props {
    anime: FavoriteAnimeCondensed;
}

export const UserFavoriteAnimeElement = ({ anime }: Props) => {

    const { _id, image, title } = anime;

    return (
        <Popup key={_id} className="normal-popup" position="top center" offsetY={2} on="hover" mouseEnterDelay={200} trigger={<Link to={`/anime/${_id}`} className="users__favorite-anime-item" style={{ backgroundImage: `url(${HOST_ADDRESS}/image/${image.src})` }} />}>
            {title}
        </Popup>
    );
};