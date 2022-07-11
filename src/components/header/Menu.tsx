import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faEnvelope, faHouse, faImages, faPlus, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import { OnlineUsers } from "./OnlineUsers";

import { useUser } from "../../contexts/userContext";

export const Menu = () => {

    const { user } = useUser();

    const profileComponent = useMemo(() => {
        return user.logged &&
            <li className="menu__item">
                <NavLink to={`/users/${user.userId}`} className="menu__link">
                    <FontAwesomeIcon icon={faUser} className="menu__icon" />Profil
                </NavLink>
                <div className="menu__border" />
            </li>;
    }, [user]);

    const addNewAnimeComponent = useMemo(() => {
        return ([1, 2].includes(user.rank)) &&
            <li className="menu__item">
                <NavLink to={`/anime-create`} className="menu__link">
                    <FontAwesomeIcon icon={faPlus} className="menu__icon" />Dodaj Nowe Anime
                </NavLink>
                <div className="menu__border" />
            </li>;
    }, [user]);

    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink to="/" end className="menu__link"><FontAwesomeIcon icon={faHouse} className="menu__icon" />Home</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="menu__item">
                    <NavLink to="/anime" end className="menu__link"><FontAwesomeIcon icon={faClapperboard} className="menu__icon" />Anime</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="menu__item">
                    <NavLink to="/news" end className="menu__link"><FontAwesomeIcon icon={faEnvelope} className="menu__icon" />Nowości</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="menu__item">
                    <NavLink to="/users" end className="menu__link"><FontAwesomeIcon icon={faUserGroup} className="menu__icon" />Users</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="menu__item">
                    <NavLink to="/galery" end className="menu__link"><FontAwesomeIcon icon={faImages} className="menu__icon" />Galery</NavLink>
                    <div className="menu__border"></div>
                </li>
                {profileComponent}
                {addNewAnimeComponent}
                <OnlineUsers />
            </ul>
        </nav>
    );
};