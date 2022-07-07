import { AnimeSeason } from "../../../../types";
import { FavoriteAnimeElement } from "../../../common/FavoriteAnimeElement";

interface Props {
    seasons: AnimeSeason[];
}

export const AnimeSeasons = ({ seasons }: Props) => {

    const seasonsList = () => {
        return seasons.map(s => <FavoriteAnimeElement key={s._id} anime={{ anime: s, rate: undefined }} />);
    };

    return (
        <div className="main__subsection anime-page__seasons">
            <h3 className="anime-page__subtitle anime-page__seasons-title">Sezony / Powiązane anime</h3>
            <ul className="anime-page__seasons-list">
                {seasonsList()}
            </ul>
        </div>
    );
};