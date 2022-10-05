import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import { AnimeImage } from "../../types";
import { CloseButton } from "../common/CloseButton";
import { IconButton } from "../common/IconButton";
import { Image } from "../common/Image";
import { LightBoxActions } from "../common/LightBox";
import { LightBoxItem } from "../common/LightBoxItem";

interface Props {
    actions: LightBoxActions;
    images: AnimeImage[];
    isOpen: boolean;
    index: number;
    close: () => void;
}

export const LightBoxPopup = ({ actions, close, images, index, isOpen }: Props) => {
    const { handleNext, handlePrev } = actions;

    const imagesList = () => {
        return (
            images.map((i, index) => (
                <LightBoxItem
                    key={i.src}
                    actions={{...actions, index}}
                    image={i}
                />
            ))
        );
    };

    return (
        <Popup open={isOpen} onClose={close} className="lightbox">
            <div id="lightbox-layout" className="lightbox">
                <div className="lightbox__aside lightbox__top">
                    <CloseButton handler={close} className="lightbox__close" />
                </div>
                <div className="lightbox__img-wrapper">
                    <Image alt={images[index].fromAnime} src={images[index].src} className="lightbox__img" />
                </div>
                <div className="lightbox__aside lightbox__bottom">
                    <IconButton handler={handlePrev} icon={faAngleLeft} className="lightbox__arrow" />
                    <ul className="lightbox__list">
                        {imagesList()}
                    </ul>
                    <IconButton handler={handleNext} icon={faAngleRight} className="lightbox__arrow" />
                </div>
            </div>
        </Popup>
    );
};