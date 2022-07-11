import { RefObject } from "react";
import { HOST_ADDRESS } from "../../config";

interface Props {
    audioRef: RefObject<HTMLAudioElement>;
    src: string;
    isStatic?: boolean;
    autoplay?: boolean;
}

export const HiddenAudio = ({ src, audioRef, isStatic, autoplay }: Props) => {
    return (
        <audio ref={audioRef} src={isStatic ? src : `${HOST_ADDRESS}/media/${src}`} autoPlay={autoplay} className="audio--hidden" />
    );
};