import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faEnvelope, faHouse, faImages, faPlus, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import { OnlineUsers } from "./OnlineUsers";

export const Menu = () => {

    const { status, authorization, user } = { status: true, authorization: 2, user: { _id: "siema" } };

    const profileComponent = useMemo(() => {
        return status &&
            <li className="menu__item">
                <NavLink to={`/users/${user._id}`} className="menu__link">
                    <FontAwesomeIcon icon={faUser} className="menu__icon" />Profil
                </NavLink>
                <div className="menu__border" />
            </li>;
    }, [status, user._id]);

    const addNewAnimeComponent = useMemo(() => {
        return (authorization === 1 || authorization === 2) &&
            <li className="menu__item">
                <NavLink to={`/anime/create`} className="menu__link">
                    <FontAwesomeIcon icon={faPlus} className="menu__icon" />Dodaj Nowe Anime
                </NavLink>
                <div className="menu__border" />
            </li>;
    }, [authorization]);

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