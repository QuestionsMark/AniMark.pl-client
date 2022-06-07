import { useEffect, useRef, useState, WheelEvent } from "react";

export const useHiddenAudio = (initialVolume: number = 0.1) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [volume, setVolume] = useState(initialVolume);

    const setSource = (src: string) => {
        if (!audioRef.current) return;
        audioRef.current.src = src;
    }

    const handleMusic = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };
    const handleVolumeChange = (e: WheelEvent) => {
        const { deltaY } = e;
        if (deltaY > 0) {
            if (volume === 0) return;
            if (volume <= 0.05) return setVolume(0);
        }
        if (deltaY < 0) {
            if (volume === 1) return;
            if (volume >= 0.95) return setVolume(1);
        }
        setVolume(prev => prev - (deltaY / 10000 * 5));
    };

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
    }, [volume]);

    return { audioRef, volume, handleMusic, handleVolumeChange, setSource };
};