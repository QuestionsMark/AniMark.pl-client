import { useEffect, useState } from "react";
import { AnimeCreateEntity, FormEntity, LoginFormEntity, NewsFormEntity, RegistrationFormEntity, ValidationType } from "../types";
import { animeCreateValidation } from "../validation/animeCreateValidation";
import { loginValidation } from "../validation/login";
import { newsCreateValidation } from "../validation/newsCreateValidation";
import { registartionValidation } from "../validation/registraction";

export const useValidation = (form: FormEntity, type: ValidationType) => {

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        switch (type) {
            case 'LOGIN': {
                setErrors(loginValidation(form as LoginFormEntity));
                break;
            }

            case 'REGISTRATION': {
                setErrors(registartionValidation(form as RegistrationFormEntity));
                break;
            }

            case 'NEWS_CREATE': {
                setErrors(newsCreateValidation(form as NewsFormEntity));
                break;
            }

            case 'ANIME_CREATE': {
                setErrors(animeCreateValidation(form as AnimeCreateEntity));
                break;
            }
        }
    }, [form]);

    return { errors };
};