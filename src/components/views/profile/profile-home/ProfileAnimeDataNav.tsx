import { Dispatch, SetStateAction } from "react";

interface Props {
    nav: number;
    setNav: Dispatch<SetStateAction<number>>;
}

export const ProfileAnimeDataNav = ({ nav, setNav }: Props) => {
    return (
        <nav className="profile-home__anime-data-menu">
            <ul className="profile-home__anime-data-menu-list">
                {['Obejrzane', 'W trakcie oglądania', 'Wstrzymane', 'Planowane']
                    .map((s, i) => <li key={s} className="profile-home__anime-data-menu-item" onClick={() => setNav(i)}>
                        <p className={`profile-home__anime-data-menu-link${i === nav ? ' active' : ''}`}>{s}</p>
                        <div className="profile-home__anime-data-menu-border" />
                    </li>)}
            </ul>
        </nav>
    );
};