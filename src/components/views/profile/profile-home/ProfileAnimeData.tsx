import { useState } from "react";
import { UserAnimeDataCondensedAPI } from "../../../../types";
import { FavoriteAnimeElement } from "../../../common/FavoriteAnimeElement";
import { ProfileAnimeDataNav } from "./ProfileAnimeDataNav";

interface Props {
    userAnimeData: UserAnimeDataCondensedAPI;
}

export const ProfileAnimeData = ({ userAnimeData }: Props) => {

    const { planned, processOfWatching, stopped, watched } = userAnimeData;

    const [nav, setNav] = useState(0);

    const animeList = (nav: number) => {
        switch (nav) {
            case 0:
                return watched.map(a => <FavoriteAnimeElement key={a.anime._id} anime={a} className="profile-home__anime-data-item" />);
            case 1:
                return processOfWatching.map(a => <FavoriteAnimeElement key={a._id} anime={{ anime: a }} className="profile-home__anime-data-item" />);
            case 2:
                return stopped.map(a => <FavoriteAnimeElement key={a._id} anime={{ anime: a }} className="profile-home__anime-data-item" />);
            case 3:
                return planned.map(a => <FavoriteAnimeElement key={a._id} anime={{ anime: a }} className="profile-home__anime-data-item" />);
            default:
                return watched.map(a => <FavoriteAnimeElement key={a.anime._id} anime={a} className="profile-home__anime-data-item" />);
        }
    };

    return (
        <section className="main__subsection profile-home__anime-data">
            <ProfileAnimeDataNav nav={nav} setNav={setNav} />
            <ul className="profile-home__anime-data-list">
                {animeList(nav)}
            </ul>
        </section>
    );
};