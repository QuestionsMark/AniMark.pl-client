import { Link } from "react-router-dom";
import { TypeAPI } from "../../types";

interface Props {
    type: TypeAPI;
}

export const TypeElement = ({ type }: Props) => {

    const { _id, name } = type;

    return (
        <Link to={`/types/${_id}`} className="types__type-brick">
            {name}
        </Link>
    );
};