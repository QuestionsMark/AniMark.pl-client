import { AnimeImage } from "../../../../types";
import { AnimeGaleryImageElement } from "./AnimeGaleryImageElement";

interface Props {
    galery: AnimeImage[];
}

export const AnimeGalery = ({ galery }: Props) => {

    const imagesList = () => {
        return galery.map(i => <AnimeGaleryImageElement key={i.src} img={i} />);
    };

    return (
        <div className="main__subsection anime-page__galery">
            <h3 className="anime-page__subtitle anime-page__images-title">Galeria</h3>
            <ul className="anime-page__images-list">
                {imagesList()}
            </ul>
        </div>
    );
};