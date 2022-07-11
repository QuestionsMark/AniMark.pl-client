import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { TypeLoverAPI } from "../../../types";
import { Image } from "../../common/Image";

interface Props {
    lover: TypeLoverAPI;
}

export const TypeLoverElement = ({ lover }: Props) => {

    const { _id, avatar, username } = lover;

    return (
        <Popup
            trigger={
                <Link to={`/users/${_id}`} className="types__lovers-item">
                    <Image alt={username} src={avatar} />
                </Link>
            }
            on="hover"
            className="normal-popup"
        >
            {username}
        </Popup>
    );
};