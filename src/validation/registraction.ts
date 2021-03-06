import { RegistrationFormEntity } from "../types";

export const defaultRegistrationForm: RegistrationFormEntity = {
    email: '',
    login: '',
    password: '',
    rulesAcceptation: false,
    username: '',
};

export const registartionValidation = (form: RegistrationFormEntity): string[] => {
    const errors: string[] = [];
    const { email, login, password, rulesAcceptation, username } = form;

    if (!email || typeof email !== 'string' || email.indexOf('@') === -1 || email.length > 400) {
        errors.push('Podaj prawidłowy email.');
    }

    if (!login || typeof login !== 'string' || login.length > 150) {
        errors.push('Login powinien być ciągniem znaków o długości nie większej niż 150.');
    }

    if (!password || typeof password !== 'string' || password.length > 150 || password.indexOf(' ') !== -1) {
        errors.push('Hasło powinno być ciągniem znaków o długości nie większej niż 150 i nie może zawierać spacji.');
    }

    if (!rulesAcceptation || typeof rulesAcceptation !== 'boolean') {
        errors.push('Aby załozyć konto musisz zaakceptować regulamin platformy.');
    }

    if (!username || typeof username !== 'string' || username.length > 25) {
        errors.push('Nick może zawierać maksymalnie 25 znaków.');
    }

    return errors;
};