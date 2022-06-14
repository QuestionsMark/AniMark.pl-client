import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { TypeAPI } from "../../types";

interface Props {
    type: TypeAPI;
}

export const TypeElement = ({ type }: Props) => {

    const { _id, name } = type;

    const { user } = useUser();

    const isFavorite = () => {
        if (!user.data) return false;
        return user.data.favoriteType === _id;
    };

    return (
        <Link to={`/types/${_id}`} className={`types__type-brick${isFavorite() ? ' types__type-brick--favorite' : ''}`}>
            {name}
        </Link>
    );
};