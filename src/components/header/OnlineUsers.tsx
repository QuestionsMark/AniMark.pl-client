import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { OnlineUsersItem } from "./OnlineUsersItem";
import { useData } from "../../hooks/useData";
import { OnlineUserCondensedAPI } from "../../types";
import { useSocket } from "../../contexts/socketContext";

export const OnlineUsers = () => {

    const componentRef = useRef<HTMLLIElement>(null);

    const { socket } = useSocket();

    const { data: onlineUsers, setRefresh } = useData<OnlineUserCondensedAPI[]>('users/online', componentRef);

    const usersList = () => {
        if (!onlineUsers) return;
        return onlineUsers.map((u, i) => <OnlineUsersItem key={u._id ? u._id : String(i)} user={u} />);
    };

    useEffect(() => {
        if (socket === null) return;
        socket.on('online-users__refresh', () => {
            setRefresh(state => state === null ? false : !state);
        });
        return () => { socket.off('online-users__refresh') };
    }, [socket]);

    return (
        <li ref={componentRef} className="menu__item online-users">
            {onlineUsers && onlineUsers.length > 0 &&
                <div className="online-users__content">
                    <FontAwesomeIcon icon={faUsersLine} className="online-users__icon" />
                    <p className="online-users__text">Online ( <span className="online-users__value" style={{ color: onlineUsers.length > 1 ? 'rgb(94, 196, 94)' : 'rgb(209, 65, 65)' }}>{onlineUsers.length}</span> )</p>
                    {usersList()}
                </div>}
        </li>
    );
};