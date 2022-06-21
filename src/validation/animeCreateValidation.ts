import { AnimeCreateEntity } from "../types";

export const animeCreateValidation = (state: AnimeCreateEntity): string[] => {
    const errors: string[] = [];
    const { animeImagesPreview, epizodeDuration, epizodesCount, hours, kind, minutes, productionYear, scenario, seasons, soundtracks, soundtracksPreview, title, types, watchLink, background, baner, mini } = state;

    return errors;
};