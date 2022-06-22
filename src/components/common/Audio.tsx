import { faPause, faPlay, faVolumeHigh, faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useRef, useState, WheelEvent } from 'react';
import { HOST_ADDRESS } from '../../config';
import { Audio } from '../../utils/audioHelper';
import { Loading } from './Loading';

interface Props {
    id: string;
    isStatic?: boolean;
}

export const AudioComponent = ({ id, isStatic }: Props) => {

    const componentRef = useRef<HTMLDivElement>(null);
    const inpProgressDOM = useRef<HTMLInputElement>(null);
    const inpVolumeDOM = useRef<HTMLInputElement>(null);

    const [src, setSrc] = useState(id);
    const [audio, setAudio] = useState<Audio | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(20);

    const handleToggleVolume = () => {
        if (!audio) return;
        if (volume === 0) {
            audio.setVolume(audio.prevVolume < 2 ? 20 : audio.prevVolume);
            setVolume(audio.getVolume());
        } else {
            audio.setVolume(0);
            setVolume(audio.getVolume());
        }
    };
    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!audio) return;
        audio.setVolume(Number(e.target.value));
        setVolume(audio.getVolume());
    };
    const handleWheelVolumeChange = (e: WheelEvent) => {
        if (!audio) return;
        const { deltaY } = e;
        if (deltaY > 0) {
            if (volume === 0) return;
            if (volume <= 5) {
                audio.setVolume(0);
                setVolume(audio.getVolume());
                return;
            }
        }
        if (deltaY < 0) {
            if (volume === 100) return;
            if (volume >= 95) {
                audio.setVolume(100);
                setVolume(audio.getVolume());
                return;
            }
        }
        audio.setVolume(audio.volume - (deltaY / 100 * 5));
        setVolume(audio.getVolume());
    };

    const handlePlay = () => {
        if (!audio) return;
        if (isRunning) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsRunning(prev => !prev);
    };

    const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!audio) return;
        audio.setProgress(Number(e.target.value));
        setProgress(audio.getProgress());
    };

    const handleMouseEnter = () => {
        if (!inpProgressDOM.current || !inpVolumeDOM.current) return;
        inpProgressDOM.current.classList.add('hide');
        inpVolumeDOM.current.classList.add('visible');
    };
    const handleMouseLeave = () => {
        if (!inpProgressDOM.current || !inpVolumeDOM.current) return;
        inpProgressDOM.current.classList.remove('hide');
        inpVolumeDOM.current.classList.remove('visible');
    };

    const handleTimeUpdate = (e: ChangeEvent<HTMLAudioElement>) => {
        if (!audio) return;
        audio.setCurrentTime((e.target.currentTime));
        setCurrentTime(audio.getCurrentTimeText());
        setProgress(audio.getProgress());
    };

    const handleComplete = () => {
        if (!audio) return;
        audio.complete();
        setAudioState();
    };

    const onLoadHandler = (e: SyntheticEvent<HTMLAudioElement>) => {
        setAudio(new Audio(e.target as HTMLAudioElement));
    };

    const setAudioState = useCallback(() => {
        if (!audio) return;
        setIsRunning(audio.isRunning);
        setVolume(audio.getVolume());
        setDuration(audio.getDurationText());
        setCurrentTime(audio.getCurrentTimeText());
        setProgress(audio.getProgress());
    }, [audio]);

    const togglePlayPauseComponent = () => {
        return isRunning ? <FontAwesomeIcon icon={faPause} className="audio__icon" onClick={handlePlay} /> : <FontAwesomeIcon icon={faPlay} className="audio__icon" onClick={handlePlay} />;
    };

    const toggleVolumeComponent = () => {
        if (volume === 0) return <FontAwesomeIcon icon={faVolumeXmark} className="audio__icon" onClick={handleToggleVolume} />;
        if (volume <= 50) return <FontAwesomeIcon icon={faVolumeLow} className="audio__icon" onClick={handleToggleVolume} />;
        if (volume > 50) return <FontAwesomeIcon icon={faVolumeHigh} className="audio__icon" onClick={handleToggleVolume} />;
    };

    // useEffect(() => {
    //     setSrc(id);
    // }, [id]);

    useEffect(() => {
        if (!audio) return;
        audio.initAudio();
        setAudioState();
    }, [audio, setAudioState]);

    return (
        <div className="audio" ref={componentRef}>
            <audio src={isStatic ? src : `${HOST_ADDRESS}/media/${src}`} className='audio__audio' onTimeUpdate={handleTimeUpdate} onLoadedData={onLoadHandler} onEnded={handleComplete} />
            {src ? <div className="audio__interface">
                <div className="audio__run">
                    {togglePlayPauseComponent()}
                </div>
                <div className="audio__time">
                    {currentTime} / {duration}
                </div>
                <div className="audio__progress">
                    <input type="range" min={0} max={100} ref={inpProgressDOM} className="audio__inp-progress" value={progress} onChange={handleProgressChange} />
                </div>
                <div className="audio__volume" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onWheel={handleWheelVolumeChange}>
                    <input type="range" min={0} max={100} ref={inpVolumeDOM} className="audio__inp-volume" value={volume} onChange={handleVolumeChange} />
                    <div className="audio__volume-state">
                        {toggleVolumeComponent()}
                    </div>
                </div>
            </div> : <Loading />}
        </div>
    );
}