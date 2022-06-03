import { LoginFormEntity } from "../validation/login";
import { RegistrationFormEntity } from "../validation/registraction";

interface FormState {
    login?: string;
    password?: string;
    email?: string;
    username?: string;
    rulesAcceptation?: boolean;
}

interface FormSet {
    type: 'FORM_SET';
    payload: LoginFormEntity | RegistrationFormEntity;
}

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

export type FormAction = FormSet | LoginChange | PasswordChange | EmailChange | UsernameChange | RulesAcceptationChange;


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

        default:
            return state;
    }
};