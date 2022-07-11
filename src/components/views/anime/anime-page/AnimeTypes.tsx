import { TypeAPI } from "../../../../types";
import { TypeElement } from "../../../common/TypeElement";

interface Props {
    types: TypeAPI[];
}

export const AnimeTypes = ({ types }: Props) => {

    const typesList = () => {
        return types.map(t => <TypeElement key={t._id} type={t} />);
    };

    return (
        <div className="main__subsection anime-page__types">
            <h3 className="anime-page__subtitle anime-page__types-title">Gatunki</h3>
            <ul className="anime-page__types-list">
                {typesList()}
            </ul>
        </div>
    );
};