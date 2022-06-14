import { FiltersEntity } from "../components/views/anime/Anime";
import { CheckboxState } from "../components/views/anime/TypesFilter";
import { Kind, Sort } from "../types";
import { LoginFormEntity } from "../validation/login";
import { RegistrationFormEntity } from "../validation/registraction";

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

}

interface FormSet {
    type: 'FORM_SET';
    payload: LoginFormEntity | RegistrationFormEntity | FiltersEntity;
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
    type: 'KIND_CHANGE',
    payload: Kind;
}

interface MaxRateChange {
    type: 'MAX_RATE_CHANGE',
    payload: string;
}
interface MinRateChange {
    type: 'MIN_RATE_CHANGE',
    payload: string;
}
interface SortChange {
    type: 'SORT_CHANGE',
    payload: Sort;
}
interface TypesFilterChange {
    type: 'TYPES_FILTER_CHANGE',
    payload: {
        checkboxState: CheckboxState;
        id: string;
    };
}

export type FormAction = FormSet | LoginChange | PasswordChange | EmailChange | UsernameChange | RulesAcceptationChange | KindChange | MaxRateChange | MinRateChange | SortChange | TypesFilterChange;


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

        default:
            return state;
    }
};