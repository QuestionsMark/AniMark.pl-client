import { Collection } from "../types";


export const getPath = (collection: Collection, collectionId: string): string => {
    switch (collection) {
        case 'ANIME':
            return `anime/${collectionId}/comments`;
        case 'NEWS':
            return `news/${collectionId}/comments`;
        case 'WHATS_THE_MELODY':
            return `whats-the-melody/${collectionId}/comments`;
    }
};