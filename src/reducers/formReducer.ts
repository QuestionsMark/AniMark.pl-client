import { CheckboxState } from "../components/views/anime/TypesFilter";
import { AnimeCreateEntity, AnimeCreatePreview, AudioPreview, FiltersEntity, ImagePreview, Kind, LoginFormEntity, NewsFormEntity, OtherLink, RegistrationFormEntity, Sort } from "../types";
import { getSingleImagePreview, setPreviewForFiles, setSoundtracksPreviewForFiles } from "../utils/setPreviewForFiles";

interface FormState {
    login?: string;
    password?: string;
    email?: string;
    username?: string;
    rulesAcceptation?: boolean;
    kind?: Kind;
    maxRate?: string;
    minRate?: string;
    wantedTypes?: string[];
    unwantedTypes?: string[];
    sort?: Sort;
    description?: string;
    choosedImages?: string[];
    images?: File[] | null;
    otherLinks?: OtherLink[];
    preview?: ImagePreview[];
    title?: string;
    videos?: string[];

    scenario?: string;
    productionYear?: number | null;
    epizodesCount?: number | null;
    epizodeDuration?: number | null;
    hours?: number | null;
    minutes?: number | null;
    watchLink?: string;
    types?: string[];
    seasons?: string[];
    background?: File | null;
    baner?: File | null;
    mini?: File | null;
    animeImagesPreview?: AnimeCreatePreview;
    soundtracks?: File[] | null;
    soundtracksPreview?: AudioPreview[];
}

interface FormSet {
    type: 'FORM_SET';
    payload: LoginFormEntity | RegistrationFormEntity | FiltersEntity | NewsFormEntity | AnimeCreateEntity;
}

// Login and registraction actions:

interface LoginChange {
    type: 'LOGIN_CHANGE';
    payload: string;
}

interface PasswordChange {
    type: 'PASSWORD_CHANGE';
    payload: string;
}

interface EmailChange {
    type: 'EMAIL_CHANGE';
    payload: string;
}

interface UsernameChange {
    type: 'USERNAME_CHANGE';
    payload: string;
}

interface RulesAcceptationChange {
    type: 'RULES_ACCEPTATION_CHANGE';
    payload: boolean;
}

// Filter actions:

interface KindChange {
    type: 'KIND_CHANGE';
    payload: Kind;
}

interface MaxRateChange {
    type: 'MAX_RATE_CHANGE';
    payload: string;
}
interface MinRateChange {
    type: 'MIN_RATE_CHANGE';
    payload: string;
}
interface SortChange {
    type: 'SORT_CHANGE';
    payload: Sort;
}
interface TypesFilterChange {
    type: 'TYPES_FILTER_CHANGE';
    payload: {
        checkboxState: CheckboxState;
        id: string;
    };
}

// News actions:

interface TitleChange {
    type: 'TITLE_CHANGE';
    payload: string;
}

interface DescriptionChange {
    type: 'DESCRIPTION_CHANGE';
    payload: string;
}

interface ImagesChange {
    type: 'IMAGES_CHANGE';
    payload: File[] | null;
}
interface ImagesOrderChange {
    type: 'IMAGES_ORDER_CHANGE';
    payload: number;
}
interface ImagesDelete {
    type: 'IMAGES_DELETE';
    payload: number;
}

interface ChoosedImagesChange {
    type: 'CHOOSED_IMAGES_CHANGE';
    payload: {
        graphicsCount: number;
        value: string;
    };
}

interface OtherLinksChange {
    type: 'OTHER_LINKS_CHANGE';
    payload: {
        type: 'SRC' | 'NOTE';
        index: number;
        value: string;
    };
}
interface OtherLinksAdd {
    type: 'OTHER_LINKS_ADD';
}
interface OtherLinksDelete {
    type: 'OTHER_LINKS_DELETE';
    payload: number;
}

interface VideosChange {
    type: 'VIDEOS_CHANGE';
    payload: {
        index: number;
        value: string;
    };
}
interface VideosAdd {
    type: 'VIDEOS_ADD';
}
interface VideosDelete {
    type: 'VIDEOS_DELETE';
    payload: number;
}


// Akcje tworzenia anime:

interface ScenarioChange {
    type: 'SCENARIO_CHANGE';
    payload: string;
}
interface ProductionYearChange {
    type: 'PRODUCTION_YEAR_CHANGE';
    payload: number;
}
interface epizodesCountChange {
    type: 'EPIZODES_COUNT_CHANGE';
    payload: number;
}
interface epizodeDurationChange {
    type: 'EPIZODE_DURATION_CHANGE';
    payload: number;
}
interface HoursChange {
    type: 'HOURS_CHANGE';
    payload: number;
}
interface MinutesChange {
    type: 'MINUTES_CHANGE';
    payload: number;
}
interface WatchLinkChange {
    type: 'WATCH_LINK_CHANGE';
    payload: string;
}
interface TypesChange {
    type: 'TYPES_CHANGE';
    payload: string;
}
interface SeasonsChange {
    type: 'SEASONS_CHANGE';
    payload: string;
}
interface BackgroundChange {
    type: 'BACKGROUND_CHANGE';
    payload: File[] | null;
}
interface BanerChange {
    type: 'BANER_CHANGE';
    payload: File[] | null;
}
interface MiniChange {
    type: 'MINI_CHANGE';
    payload: File[] | null;
}
interface SoundtracksChange {
    type: 'SOUNDTRACKS_CHANGE';
    payload: {
        value: File[] | null;
        maxCount: number;
    };
}
interface SoundtracksOrderChange {
    type: 'SOUNDTRACKS_ORDER_CHANGE';
    payload: number;
}
interface SoundtracksDelete {
    type: 'SOUNDTRACKS_DELETE';
    payload: number;
}
interface SoundtracksComposerChange {
    type: 'SOUNDTRACKS_COMPOSER_CHANGE';
    payload: {
        index: number;
        value: string;
    };
}
interface SoundtracksTitleChange {
    type: 'SOUNDTRACKS_TITLE_CHANGE';
    payload: {
        index: number;
        value: string;
    };
}

export type FormAction = FormSet | LoginChange | PasswordChange | EmailChange | UsernameChange | RulesAcceptationChange | KindChange | MaxRateChange | MinRateChange | SortChange | TypesFilterChange | TitleChange | DescriptionChange | OtherLinksAdd | OtherLinksChange | OtherLinksDelete | VideosAdd | VideosChange | VideosDelete | ImagesChange | ImagesOrderChange | ImagesDelete | ChoosedImagesChange | ScenarioChange | ProductionYearChange | epizodeDurationChange | epizodesCountChange | HoursChange | MinutesChange | WatchLinkChange | TypesChange | SeasonsChange | BackgroundChange | BanerChange | MiniChange | SoundtracksChange | SoundtracksComposerChange | SoundtracksDelete | SoundtracksTitleChange | SoundtracksOrderChange;


export const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {

        case 'FORM_SET': {
            return action.payload;
        }

        case 'LOGIN_CHANGE': {
            return {
                ...state,
                login: action.payload,
            };
        }

        case 'PASSWORD_CHANGE': {
            return {
                ...state,
                password: action.payload,
            };
        }

        case 'EMAIL_CHANGE': {
            return {
                ...state,
                email: action.payload,
            };
        }

        case 'USERNAME_CHANGE': {
            return {
                ...state,
                username: action.payload,
            };
        }

        case 'RULES_ACCEPTATION_CHANGE': {
            return {
                ...state,
                rulesAcceptation: action.payload,
            };
        }

        // Filter reducers:

        case 'KIND_CHANGE': {
            return {
                ...state,
                kind: action.payload,
            };
        }

        case 'MAX_RATE_CHANGE': {
            return {
                ...state,
                maxRate: action.payload,
            };
        }

        case 'MIN_RATE_CHANGE': {
            return {
                ...state,
                minRate: action.payload,
            };
        }

        case 'SORT_CHANGE': {
            return {
                ...state,
                sort: action.payload,
            };
        }

        case 'TYPES_FILTER_CHANGE': {
            const { checkboxState, id } = action.payload;
            switch (checkboxState) {
                case 'WE':
                    return {
                        ...state,
                        wantedTypes: [...(state.wantedTypes as string[]), id],
                    };

                case 'W':
                    return {
                        ...state,
                        wantedTypes: state.wantedTypes?.filter(t => t !== id),
                        unwantedTypes: [...(state.unwantedTypes as string[]), id],
                    };

                case 'DW':
                    return {
                        ...state,
                        unwantedTypes: state.unwantedTypes?.filter(t => t !== id),
                    };

                default:
                    return state;
            }
        }

        // News reducers:

        case 'DESCRIPTION_CHANGE': {
            return {
                ...state,
                description: action.payload,
            };
        }

        case 'TITLE_CHANGE': {
            return {
                ...state,
                title: action.payload,
            };
        }

        case 'CHOOSED_IMAGES_CHANGE': {
            const { graphicsCount, value } = action.payload;
            const isChoosed = state.choosedImages?.findIndex(i => i === value) !== -1;
            if (isChoosed) return { ...state, choosedImages: state.choosedImages?.filter(i => i !== value) }
            if (graphicsCount > 4) return state;
            return { ...state, choosedImages: [...state.choosedImages as string[], value] };
        }

        case 'IMAGES_CHANGE': {
            const { payload } = action;
            if (state.images && payload && payload.length > 0) {
                return {
                    ...state,
                    images: [...state.images, ...payload],
                    preview: [...(state.preview as ImagePreview[]), ...setPreviewForFiles(payload)],
                }
            }
            if (!state.images) {
                return {
                    ...state,
                    images: payload && payload.length > 0 ? payload : null,
                    preview: setPreviewForFiles(payload && payload.length > 0 ? payload : []),
                }
            }
            return {
                ...state,
            }
        }

        case 'IMAGES_ORDER_CHANGE': {
            if (!state.images || state.images.length < 2 || !state.preview || state.preview.length < 2) return state;
            const { payload } = action;
            const images = [...state.images];
            const prevImg = images[payload - 1];
            const img = images[payload];
            const restImg = images.slice(payload + 1);

            const previews = [...state.preview];
            const prevPreview = previews[payload - 1];
            const preview = previews[payload];
            const restPreviews = previews.slice(payload + 1);
            return {
                ...state,
                images: [...images.splice(0, payload - 1), img, prevImg, ...restImg],
                preview: [...previews.splice(0, payload - 1), preview, prevPreview, ...restPreviews],
            }
        }

        case 'IMAGES_DELETE': {
            const { payload } = action;
            const newImages = state.images?.filter((img, i) => i !== payload);
            const newPreview = newImages && newImages.length > 0 ? state.preview?.filter((img, i) => i !== payload) : [];
            return {
                ...state,
                images: newImages && newImages.length > 0 ? newImages : null,
                preview: newPreview,
            }
        }

        case 'OTHER_LINKS_ADD': {
            return {
                ...state,
                otherLinks: [...state.otherLinks as OtherLink[], { note: '', src: '' }],
            }
        }

        case 'OTHER_LINKS_CHANGE': {
            return {
                ...state,
                otherLinks: state.otherLinks?.map((link, i) => {
                    const { index, type, value } = action.payload;
                    if (type === 'NOTE') {
                        if (index === i) return { ...link, note: value };
                        return link;
                    } else if (type === 'SRC') {
                        if (index === i) return { ...link, src: value };
                        return link;
                    }
                    return link;
                }) as OtherLink[],
            }
        }

        case 'OTHER_LINKS_DELETE': {
            return {
                ...state,
                otherLinks: state.otherLinks?.filter((l, i) => i !== action.payload),
            }
        }

        case 'VIDEOS_ADD': {
            return {
                ...state,
                videos: [...state.videos as string[], ''],
            }
        }

        case 'VIDEOS_CHANGE': {
            const { index, value } = action.payload;
            return {
                ...state,
                videos: state.videos?.map((v, i) => {
                    if (i === index) return value;
                    return v;
                }),
            }
        }

        case 'VIDEOS_DELETE': {
            return {
                ...state,
                videos: state.videos?.filter((l, i) => i !== action.payload),
            }
        }

        // Anime create reducers:

        case 'SCENARIO_CHANGE': {
            return {
                ...state,
                scenario: action.payload,
            }
        }

        case 'PRODUCTION_YEAR_CHANGE': {
            return {
                ...state,
                productionYear: action.payload,
            }
        }

        case 'EPIZODES_COUNT_CHANGE': {
            return {
                ...state,
                epizodesCount: action.payload,
            }
        }

        case 'EPIZODE_DURATION_CHANGE': {
            return {
                ...state,
                epizodeDuration: action.payload,
            }
        }

        case 'HOURS_CHANGE': {
            return {
                ...state,
                hours: action.payload,
            }
        }

        case 'MINUTES_CHANGE': {
            return {
                ...state,
                minutes: action.payload,
            }
        }

        case 'WATCH_LINK_CHANGE': {
            return {
                ...state,
                watchLink: action.payload,
            }
        }

        case 'TYPES_CHANGE': {
            const { payload } = action;
            const isHere = state.types?.findIndex(t => t === payload) !== -1;
            if (isHere) return { ...state, types: state.types?.filter(t => t !== payload) };
            return { ...state, types: [...(state.types as any), payload] };
        }

        case 'SEASONS_CHANGE': {
            const { payload } = action;
            const isHere = state.seasons?.findIndex(s => s === payload) !== -1;
            if (isHere) return { ...state, seasons: state.seasons?.filter(s => s !== payload) };
            return { ...state, seasons: [...(state.seasons as any), payload] };
        }

        case 'BACKGROUND_CHANGE': {
            return {
                ...state, background: action.payload ? action.payload[0] : null, animeImagesPreview: {
                    background: getSingleImagePreview(action.payload ? action.payload[0] : null),
                    baner: (state.animeImagesPreview as AnimeCreatePreview).baner,
                    mini: (state.animeImagesPreview as AnimeCreatePreview).mini,
                }
            };
        }

        case 'BANER_CHANGE': {
            return {
                ...state, baner: action.payload ? action.payload[0] : null, animeImagesPreview: {
                    background: (state.animeImagesPreview as AnimeCreatePreview).background,
                    baner: getSingleImagePreview(action.payload ? action.payload[0] : null),
                    mini: (state.animeImagesPreview as AnimeCreatePreview).mini,
                }
            };
        }

        case 'MINI_CHANGE': {
            return {
                ...state, mini: action.payload ? action.payload[0] : null, animeImagesPreview: {
                    background: (state.animeImagesPreview as AnimeCreatePreview).background,
                    baner: (state.animeImagesPreview as AnimeCreatePreview).baner,
                    mini: getSingleImagePreview(action.payload ? action.payload[0] : null),
                }
            };
        }

        case 'SOUNDTRACKS_CHANGE': {
            const { maxCount, value } = action.payload;
            if (state.soundtracks && value && value.length > 0) {
                return {
                    ...state,
                    soundtracks: [...state.soundtracks, ...value],
                    soundtracksPreview: [...(state.soundtracksPreview as AudioPreview[]), ...setSoundtracksPreviewForFiles(value)],
                }
            }
            if (!state.images) {
                return {
                    ...state,
                    soundtracks: value && value.length > 0 ? value : null,
                    soundtracksPreview: setSoundtracksPreviewForFiles(value && value.length > 0 ? value : []),
                }
            }
            return {
                ...state,
            }
        }

        case 'SOUNDTRACKS_ORDER_CHANGE': {
            if (!state.soundtracks || state.soundtracks.length < 2 || !state.soundtracksPreview || state.soundtracksPreview.length < 2) return state;
            const { payload } = action;
            const soundtracks = [...state.soundtracks];
            const prevImg = soundtracks[payload - 1];
            const mp3 = soundtracks[payload];
            const restSoundtracks = soundtracks.slice(payload + 1);

            const previews = [...state.soundtracksPreview];
            const prevPreview = previews[payload - 1];
            const preview = previews[payload];
            const restPreviews = previews.slice(payload + 1);
            return {
                ...state,
                soundtracks: [...soundtracks.splice(0, payload - 1), mp3, prevImg, ...restSoundtracks],
                soundtracksPreview: [...previews.splice(0, payload - 1), preview, prevPreview, ...restPreviews],
            }
        }

        case 'SOUNDTRACKS_COMPOSER_CHANGE': {
            const { index, value } = action.payload;
            return {
                ...state,
                soundtracksPreview: state.soundtracksPreview?.map((s, i) => {
                    if (i !== index) return s;
                    return { ...s, composer: value };
                }),
            }
        }

        case 'SOUNDTRACKS_DELETE': {
            const { payload } = action;
            const newSoundtracks = state.soundtracks?.filter((s, i) => i !== payload);
            const newPreview = newSoundtracks && newSoundtracks.length > 0 ? state.soundtracksPreview?.filter((s, i) => i !== payload) : [];
            return {
                ...state,
                soundtracks: newSoundtracks && newSoundtracks.length > 0 ? newSoundtracks : null,
                soundtracksPreview: newPreview,
            }
        }

        case 'SOUNDTRACKS_TITLE_CHANGE': {
            const { index, value } = action.payload;
            return {
                ...state,
                soundtracksPreview: state.soundtracksPreview?.map((s, i) => {
                    if (i !== index) return s;
                    return { ...s, title: value };
                }),
            }
        }

        default:
            return state;
    }
};