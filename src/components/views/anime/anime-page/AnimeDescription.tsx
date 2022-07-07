import { Link } from "react-router-dom";
import { AnimeDescriptionPopulate } from "../../../../types";
import { textHelper } from "../../../../utils/textHelper";

interface Props {
    description: AnimeDescriptionPopulate;
}

export const AnimeDescription = ({ description }: Props) => {
    return (
        <div className="main__subsection anime-page__description">
            <h3 className="anime-page__subtitle anime-page__description-title">Opis</h3>
            <div className="text text--indent anime-page__description-text">
                {textHelper(description.description)}
                <Link to={`/users/${description.author._id}`} className="link anime-page__description-author">{description.author.username}</Link>
            </div>
        </div>
    );
};