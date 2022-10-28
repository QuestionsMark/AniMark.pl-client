import { NavLink } from "react-router-dom";
import { useUser } from "../../../contexts/userContext";

interface Props {
    userId: string;
}

export const ProfileNav = ({ userId }: Props) => {

    const { user } = useUser();

    return (
        <nav className="profile__menu">
            <ul className="profile__menu-list">
                <li className="profile__menu-item">
                    <NavLink to={`/users/${userId}`} end className="profile__menu-link">Profil</NavLink>
                </li>
                <li className="profile__menu-item">
                    <NavLink to={`/users/${userId}/anime`} className="profile__menu-link">Top Anime</NavLink>
                </li>
                <li className="profile__menu-item">
                    <NavLink to={`/users/${userId}/achievements`} className="profile__menu-link">Osiągnięcia</NavLink>
                </li>
                {userId === user.userId && <li className="profile__menu-item">
                    <NavLink to={`/users/${userId}/edit`} className="profile__menu-link">Edycja Profilu</NavLink>
                </li>}
                {userId === user.userId && <li className="profile__menu-item">
                    <NavLink to={`/users/${userId}/privacy-settings`} className="profile__menu-link">Ustawienia Prywatności</NavLink>
                </li>}
            </ul>
        </nav>
    );
};