import { useState } from "react";
import { UserAnimeDataCondensedAPI } from "../../../../types";
import { AnimeBrickElement } from "../../../common/AnimeBrickElement";
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
                return watched.map(a => <AnimeBrickElement key={a.anime._id} anime={a} />);
            case 1:
                return processOfWatching.map(a => <AnimeBrickElement key={a._id} anime={{ anime: a }} />);
            case 2:
                return stopped.map(a => <AnimeBrickElement key={a._id} anime={{ anime: a }} />);
            case 3:
                return planned.map(a => <AnimeBrickElement key={a._id} anime={{ anime: a }} />);
            default:
                return watched.map(a => <AnimeBrickElement key={a.anime._id} anime={a} />);
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