import { faHeart, faMedal, faPlus, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { HOST_ADDRESS } from "../../../config";
import { UserCondensedAPI } from "../../../types";
import { textHelper } from "../../../utils/textHelper";
import { Image } from "../../common/Image";
import { UserAchievementElement } from "./UserAchievementElement";
import { FavoriteAnimeElement } from "../../common/FavoriteAnimeElement";
import { UserFavoriteAnimeMore } from "./UserFavoriteAnimeMore";

interface Props {
    place: number;
    user: UserCondensedAPI;
    observer?: (node: any) => void;
}

export const UserElement = ({ place, user, observer }: Props) => {

    const { _id, achievements, avatar, background, favoriteAnime, favoriteType, introduction, likes, sumOfPoints, username } = user;

    const achievementsList = () => {
        return achievements
            .sort((a, b) => {
                if (a.level > b.level) return -1;
                if (a.level < b.level) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })
            .slice(0, 8)
            .map(a => <UserAchievementElement key={a._id} achievement={a} />);
    };

    const favoriteAnimeList = () => {
        return favoriteAnime
            .slice(0, 3)
            .map(a => <FavoriteAnimeElement key={a.anime._id} anime={a} className="users__favorite-anime-item" />);
    };

    return (
        <li className="users__item" ref={observer ? observer : null} style={{ backgroundImage: `url(${HOST_ADDRESS}/media/${background})` }}>
            <div className="users__curtain" />
            <header className="users__header">
                <div className="users__avatar">
                    <Image alt={username} src={avatar} />
                </div>
                <div className="users__introduction">
                    <Link to={`/users/${_id}`} className="users__username">{username}</Link>
                    <div className="text--indent users__description">{textHelper(introduction.description)}</div>
                </div>
                <div className="users__specifications">
                    <div className="users__specification">
                        <FontAwesomeIcon icon={faTrophy} className="users__specification-icon users__place-icon" />
                        <p className="users__value">{place}</p>
                    </div>
                    <div className="users__specification">
                        <FontAwesomeIcon icon={faMedal} className="users__specification-icon" />
                        <p className="users__value">{sumOfPoints}</p>
                    </div>
                    <div className="users__specification">
                        <FontAwesomeIcon icon={faHeart} className="users__specification-icon" />
                        <p className="users__value">{likes.length}</p>
                    </div>
                    <div className="users__specification">
                        {favoriteType ? favoriteType : 'Brak'}
                    </div>
                </div>
            </header>
            <section className="users__lists">
                <div className="users__statistic-list">
                    <h2 className="users__subtitle">Osiągnięcia:</h2>
                    <ul className="users__achievements-list">
                        {achievements.length > 0 ? achievementsList() : 'Brak osiągnięć.'}
                        {achievements.length > 10 ? <Link to={`/users/${_id}/achievements`} className="users__achievement users__achievement--more">
                            <FontAwesomeIcon icon={faPlus} className="users__achievement-icon" />
                            {achievements.length - 8}
                        </Link> : null}
                    </ul>
                </div>
                <div className="users__statistic-list">
                    <h2 className="users__subtitle">Ulubione Anime:</h2>
                    <ul className="users__favorite-anime-list">
                        {favoriteAnime.length > 0 ? favoriteAnimeList() : 'Brak ulubionego anime.'}
                        {favoriteAnime.length > 3 && <UserFavoriteAnimeMore count={favoriteAnime.length} />}
                    </ul>
                </div>
            </section>
        </li>
    );
};