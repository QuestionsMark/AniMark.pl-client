import { Kind } from "../types";

export const getDuration = (duration: string, kind: Kind) => {
    switch (kind) {
        case 'movie': {
            const parts = duration.split(' ');
            const hours = parts[0].split('godz.')[0];
            const minutes = parts[1].split('min.')[0];
            return { hours: Number(hours), minutes: Number(minutes), epizodesCount: null, epizodeDuration: null };
        }
        case 'series': {
            const parts = duration.split(' ');
            const epizodesCount = parts[0].split('odc.')[0];
            const epizodeDuration = parts[1].split('min.')[0];
            return { hours: null, minutes: null, epizodesCount: Number(epizodesCount), epizodeDuration: Number(epizodeDuration) };
        }

        default: {
            return { hours: null, minutes: null, epizodesCount: null, epizodeDuration: null };
        }
    }
};