import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { AnimeImage } from "../../types";
import { Image } from "../common/Image";

interface Props {
    active: boolean;
    graphicsCount: number;
    image: AnimeImage;
    dispatch: Dispatch<FormAction>;
}

export const ChooseGraphicElement = ({ active, graphicsCount, image, dispatch }: Props) => {
    return (
        <li className={`form__graphics-to-choose-item${active ? ' form__graphics-to-choose-item--active' : ''}`} onClick={() => dispatch({ type: 'CHOOSED_IMAGES_CHANGE', payload: { graphicsCount, value: image.src } })}>
            <Image alt={image.fromAnime} src={image.src} />
        </li>
    );
};