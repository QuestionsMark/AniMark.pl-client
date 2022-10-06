import { AnimeSeason } from "../../../../types";
import { AnimeBrickElement } from "../../../common/AnimeBrickElement";

interface Props {
    seasons: AnimeSeason[];
}

export const AnimeSeasons = ({ seasons }: Props) => {

    const seasonsList = () => {
        return seasons.map(s => <AnimeBrickElement key={s._id} anime={{ anime: s }} className="anime-page__seasons-item card-animation" />);
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