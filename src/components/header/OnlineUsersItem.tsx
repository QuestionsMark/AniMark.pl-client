import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import { OnlineUserCondensedAPI } from "../../types";
import { HOST_ADDRESS } from "../../config";

import guestAvatar from '../../images/guest.png';

interface Props {
    user: OnlineUserCondensedAPI;
}

export const OnlineUsersItem = ({ user }: Props) => {

    const { link, avatar, username } = user;

    const styles = {
        backgroundImage: avatar ? `url(${HOST_ADDRESS}/media/${avatar})` : `url(${guestAvatar})`,
    }

    const trigger = link ? <Link to={`/users/${link}`} className="online-users__item online-users__item--link" style={styles} /> : <div className="online-users__item" style={styles} />

    return (
        <Popup className="normal-popup normal-popup--small" trigger={trigger} position="bottom center" on="hover">
            {username}
        </Popup>
    );
};