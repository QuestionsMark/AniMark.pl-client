import { CheckboxState } from "../components/views/anime/TypesFilter";
import { FiltersEntity, ImagePreview, Kind, LoginFormEntity, NewsFormEntity, OtherLink, RegistrationFormEntity, Sort } from "../types";
import { setPreviewForFiles } from "../utils/setPreviewForFiles";

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
}

interface FormSet {
    type: 'FORM_SET';
    payload: LoginFormEntity | RegistrationFormEntity | FiltersEntity | NewsFormEntity;
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

export type FormAction = FormSet | LoginChange | PasswordChange | EmailChange | UsernameChange | RulesAcceptationChange | KindChange | MaxRateChange | MinRateChange | SortChange | TypesFilterChange | TitleChange | DescriptionChange | OtherLinksAdd | OtherLinksChange | OtherLinksDelete | VideosAdd | VideosChange | VideosDelete | ImagesChange | ImagesOrderChange | ImagesDelete | ChoosedImagesChange;


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

        default:
            return state;
    }
};