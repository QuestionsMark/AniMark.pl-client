import { AnimeEditEntity } from "../types";

export const animeEditInformationsValidation = (state: AnimeEditEntity, prevState: AnimeEditEntity): string[] => {
    const errors: string[] = [];
    const { epizodeDuration, epizodesCount, hours, kind, minutes, productionYear, scenario, title, types, watchLink, seasons, } = state;

    if (typeof title !== 'string' || title.length <= 0 || title.length > 200) {
        errors.push('Tytuł powinien zawierać od 1 do 200 znaków.');
    }

    if (typeof watchLink !== 'string' || watchLink.length <= 0) {
        errors.push('Podaj link do oglądania anime.');
    }

    if (typeof scenario !== 'string' || scenario.length <= 0 || scenario.length > 150) {
        errors.push('Autor powinien zawierać od 1 do 150 znaków.');
    }

    if (typeof productionYear !== 'number' || productionYear < 1950 || productionYear > new Date().getFullYear()) {
        errors.push('Podaj rok wydania anime.');
    }

    if (kind === 'movie') {
        if (typeof hours !== 'number' || hours < 0 || hours > 1000) {
            errors.push('Podaj ilość godzin.');
        }
        if (typeof minutes !== 'number' || minutes < 0 || minutes > 59) {
            errors.push('Podaj ilość minut.');
        }
    } else {
        if (typeof epizodeDuration !== 'number' || epizodeDuration <= 0 || epizodeDuration > 1000) {
            errors.push('Podaj ilośc odcinków.');
        }
        if (typeof epizodesCount !== 'number' || epizodesCount <= 0 || epizodesCount > 10000) {
            errors.push('Podaj czas trwania odcinka w minutach.');
        }
    }

    if (types.length === 0) {
        errors.push('Anime powinno zawierać przynajmniej jeden gatunek.');
    }

    if (
        kind === prevState.kind &&
        productionYear === prevState.productionYear &&
        scenario === prevState.scenario &&
        title === prevState.title &&
        JSON.stringify(types) === JSON.stringify(prevState.types) &&
        watchLink === prevState.watchLink &&
        JSON.stringify(seasons) === JSON.stringify(prevState.seasons)
    ) {
        if (
            kind === 'movie' &&
            hours === prevState.hours &&
            minutes === prevState.minutes
        ) {
            errors.push('Nie wykryto zmian.');
        }
        if (
            kind === 'series' &&
            epizodeDuration === prevState.epizodeDuration &&
            epizodesCount === prevState.epizodesCount
        ) {
            errors.push('Nie wykryto zmian.');
        }
    }

    return errors;
};