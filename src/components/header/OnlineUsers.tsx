import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { OnlineUsersItem } from "./OnlineUsersItem";
import { useData } from "../../hooks/useData";
import { OnlineUser } from "../../types";

export const OnlineUsers = () => {

    const componentRef = useRef<HTMLLIElement>(null);

    // const onlineUsers = useData('users/online', componentRef) as OnlineUser[];
    const onlineUsers = [
        {
            _id: '1231h2b3i1jh2',
            username: 'Question',
            avatar: 'asdfasdf.png',
        },
        {
            username: 'Quest',
        },
        {
            username: 'Quest',
        },
        {
            username: 'Quest',
        },
        {
            username: 'Quest',
        },
        {
            username: 'Quest',
        },
    ] as OnlineUser[];

    const usersList = () => {
        return onlineUsers?.map((u, i) => <OnlineUsersItem key={u._id ? u._id : String(i)} user={u} />);
    };


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