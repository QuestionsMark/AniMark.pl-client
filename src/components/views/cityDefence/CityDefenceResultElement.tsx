import { format } from "date-fns";
import { CityDefenceAPI } from "../../../types";

interface Props {
    place: number;
    result: CityDefenceAPI;
    observer?: (node: any) => void;
}

export const CityDefenceResultElement = ({ place, result, observer }: Props) => {

    const { _id, createdAt, username, points, accuracy } = result;

    return (
        <li className="ranking__item" ref={observer || null}>
            <p className="ranking__stat ranking__stat-place">{place}</p>
            <p className="ranking__stat">{username}</p>
            <p className="ranking__stat">{points}</p>
            <p className="ranking__stat">{accuracy.toFixed(2)}%</p>
            <p className="ranking__stat">{format(new Date(createdAt), 'd.M.yyy')}</p>
        </li>
    );
};