import { ReactNode, useState } from "react";
import { useOpen } from "../../hooks/useOpen";
import { AnimeImage } from "../../types";
import { LightBoxPopup } from "../popups/LightBoxPopup";

export interface LightBoxActions {
    changeIndex: (index: number) => void;
    handleNext: () => void;
    handlePrev: () => void;
    // handleFullScreen: () => void;
    open: () => void;
    actualIndex: number;
    index?: number;
}

interface Props {
    children: (actions: LightBoxActions) => ReactNode;
    images: AnimeImage[];
}

export const LightBox = ({ children, images }: Props) => {
    const [index, setIndex] = useState(0);
    const { close, isOpen, open } = useOpen();

    const handlePrev = () => {
        setIndex(state => state > 0 ? state - 1 : images.length - 1);
    };
    const handleNext = () => {
        setIndex(state => state < images.length - 1 ? state + 1 : 0);
    };
    const changeIndex = (index: number) => {
        setIndex(index);
    };

    const actions: LightBoxActions = {
        changeIndex,
        handleNext,
        handlePrev,
        open,
        actualIndex: index,
    };

    return (
        <>
            {children(actions)}
            <LightBoxPopup
                actions={actions}
                close={close}
                images={images}
                index={index}
                isOpen={isOpen}
            />
        </>
    );
};