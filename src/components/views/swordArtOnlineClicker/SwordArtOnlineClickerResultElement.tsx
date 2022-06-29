import { SwordArtOnlineResultAPI } from "../../../types";

interface Props {
    place: number;
    result: SwordArtOnlineResultAPI;
    observer?: (node: any) => void;
}

export const SwordArtOnlineClickerResultElement = ({ place, result, observer }: Props) => {

    const { _id, achievements, completionTime, createdAt, lvl, swords, username } = result;

    return (
        <li className="ranking__item" ref={observer || null}>
            <p className="ranking__stat ranking__stat-place">{place}</p>
            <p className="ranking__stat">{username}</p>
            <p className="ranking__stat">{completionTime}</p>
            <p className="ranking__stat">{lvl}</p>
            <p className="ranking__stat">{achievements}</p>
            <p className="ranking__stat">{swords}</p>
        </li>
    );
};