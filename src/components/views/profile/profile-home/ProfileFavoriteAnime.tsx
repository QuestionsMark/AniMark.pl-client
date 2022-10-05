import { FavoriteAnimeCondensed } from "../../../../types";
import { AnimeBrickElement } from "../../../common/AnimeBrickElement";

interface Props {
    favoriteAnime: FavoriteAnimeCondensed[]
}

export const ProfileFavoriteAnime = ({ favoriteAnime }: Props) => {

    const animeList = () => {
        return favoriteAnime.map(a => <AnimeBrickElement key={a.anime._id} anime={a} className="card-animation" />);
    };

    return (
        <section className="main__subsection profile-home__favorite-anime">
            <h2 className="profile__title">Ulubione Anime</h2>
            <ul className="profile-home__favorite-anime-list">
                {animeList()}
            </ul>
        </section>
    );
};