import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import { OnlineUser } from "../../types";
import { HOST_ADDRESS } from "../../config";

import guestAvatar from '../../images/guest.png';

interface Props {
    user: OnlineUser;
}

export const OnlineUsersItem = ({ user }: Props) => {

    const { _id, avatar, username } = user;

    const styles = {
        backgroundImage: avatar ? `url(${HOST_ADDRESS}/images/${avatar})` : `url(${guestAvatar})`,
    }

    const trigger = _id ? <Link to={`/users/${_id}`} className="online-users__item online-users__item--link" style={styles} /> : <div className="online-users__item" style={styles} />

    return (
        <Popup className="normal-popup normal-popup--small" trigger={trigger} position="bottom center" on="hover">
            {username}
        </Popup>
    );
};