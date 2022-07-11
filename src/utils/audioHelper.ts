export class Audio {
    audio: HTMLAudioElement;
    isRunning: boolean;
    volume: number;
    prevVolume: number;
    duration: number;
    currentTime: number;

    constructor(audio: HTMLAudioElement) {
        this.audio = audio;
        this.isRunning = !audio.paused;
        this.volume = 20;
        this.prevVolume = 20;
        this.duration = audio.duration;
        this.currentTime = audio.currentTime;
    }

    _getTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.round(time % 60);
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    initAudio() {
        this.audio.volume = this.volume / 100;
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    getDurationText(): string {
        return this._getTime(this.duration);
    }

    getCurrentTimeText(): string {
        return this._getTime(this.currentTime);
    }

    setCurrentTime(time: number) {
        this.currentTime = time;
    }

    setVolume(volume: number) {
        this.audio.volume = volume / 100;
        this.prevVolume = this.volume;
        this.volume = volume;
    }

    getVolume(): number {
        return this.volume;
    }

    setProgress(value: number) {
        const time = value * this.duration / 100;
        this.audio.currentTime = time;
    }

    getProgress(): number {
        return this.currentTime * 100 / this.duration;
    }

    complete() {
        this.isRunning = !this.audio.paused;
        this.currentTime = 0;
    }
}