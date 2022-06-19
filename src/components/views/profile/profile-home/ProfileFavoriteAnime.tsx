import { FavoriteAnimeCondensed } from "../../../../types";
import { FavoriteAnimeElement } from "../../../common/FavoriteAnimeElement";

interface Props {
    favoriteAnime: FavoriteAnimeCondensed[]
}

export const ProfileFavoriteAnime = ({ favoriteAnime }: Props) => {

    const animeList = () => {
        return favoriteAnime.map(a => <FavoriteAnimeElement key={a.anime._id} anime={a} className="profile-home__favorite-anime-item" />);
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