import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    count: number;
}

export const UserFavoriteAnimeMore = ({ count }: Props) => {
    return (
        <li className="anime-brick anime-brick__more">
            <FontAwesomeIcon icon={faPlus} className="favorite-anime-icon" />
            {count - 3}
        </li>
    );
};