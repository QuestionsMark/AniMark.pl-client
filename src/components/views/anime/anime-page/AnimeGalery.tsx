import { AnimeImage } from "../../../../types";
import { LightBox, LightBoxActions } from "../../../common/LightBox";
import { AnimeGaleryImageElement } from "./AnimeGaleryImageElement";

interface Props {
    galery: AnimeImage[];
}

export const AnimeGalery = ({ galery }: Props) => {

    const imagesList = (actions: LightBoxActions) => {
        return galery.map((i, index) => (
            <AnimeGaleryImageElement
                key={i.src}
                img={i}
                actions={{...actions, index}}
            />
        ));
    };

    return (
        <div className="main__subsection anime-page__galery">
            <h3 className="anime-page__subtitle anime-page__images-title">Galeria</h3>
            <ul className="anime-page__images-list">
                <LightBox images={galery} >
                    {(actions) => imagesList(actions)}
                </LightBox>
            </ul>
        </div>
    );
};