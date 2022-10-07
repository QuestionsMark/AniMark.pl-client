import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface Props {
    count: number;
    userId: string;
}

export const UserFavoriteAnimeMore = ({ count, userId }: Props) => {
    return (
        <Link to={`/users/${userId}`} className="anime-brick anime-brick__more card-animation">
            <FontAwesomeIcon icon={faPlus} className="favorite-anime-icon" />
            {count - 3}
        </Link>
    );
};