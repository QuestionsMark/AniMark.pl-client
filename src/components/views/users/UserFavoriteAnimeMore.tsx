import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    count: number;
}

export const UserFavoriteAnimeMore = ({ count }: Props) => {
    return (
        <li className="users__favorite-anime-item users__favorite-anime-item--more">
            <FontAwesomeIcon icon={faPlus} className="users__favorite-anime-item-icon" />
            {count - 3}
        </li>
    );
};