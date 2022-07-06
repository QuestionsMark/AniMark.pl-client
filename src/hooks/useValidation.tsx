import { useEffect, useState } from "react";
import { AnimeCreateEntity, FormEntity, LoginFormEntity, NewsEditEntity, NewsFormEntity, ProjectCreateEntity, RegistrationFormEntity, ValidationType } from "../types";
import { animeCreateValidation } from "../validation/animeCreateValidation";
import { loginValidation } from "../validation/login";
import { newsCreateValidation } from "../validation/newsCreateValidation";
import { newsEditValidation } from "../validation/newsEditValidation";
import { projectCreateValidation } from "../validation/projectCreateValidation";
import { registartionValidation } from "../validation/registraction";

export const useValidation = (form: FormEntity, type: ValidationType, prevState?: FormEntity) => {

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

            case 'NEWS_EDIT': {
                setErrors(newsEditValidation(form as NewsEditEntity, prevState as NewsEditEntity));
                break;
            }

            case 'ANIME_CREATE': {
                setErrors(animeCreateValidation(form as AnimeCreateEntity));
                break;
            }

            case 'PROJECT_CREATE': {
                setErrors(projectCreateValidation(form as ProjectCreateEntity));
                break;
            }
        }
    }, [form]);

    return { errors };
};