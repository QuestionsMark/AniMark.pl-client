import { useEffect, useState } from "react";
import { AnimeCreateEntity, AnimeEditEntity, AudioPreview, FormEntity, ImagePreview, LoginFormEntity, NewsEditEntity, NewsFormEntity, ProfileEditEntity, ProjectCreateEntity, RegistrationFormEntity, ValidationType } from "../types";
import { animeCreateValidation } from "../validation/animeCreateValidation";
import { animeEditInformationsValidation } from "../validation/animeEditInformationsValidation";
import { imageEditValidation } from "../validation/imageEditValidation";
import { profileBackgroundsAddValidation } from "../validation/profileBackgroundsAddValidation";
import { loginValidation } from "../validation/login";
import { newsCreateValidation } from "../validation/newsCreateValidation";
import { newsEditValidation } from "../validation/newsEditValidation";
import { profileEditValidation } from "../validation/profileEditValidation";
import { projectCreateValidation } from "../validation/projectCreateValidation";
import { registartionValidation } from "../validation/registraction";
import { soundtracksAddValidation } from "../validation/soundtracksAddValidation";

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

            case 'ANIME_EDIT': {
                setErrors(animeEditInformationsValidation(form as AnimeEditEntity, prevState as AnimeEditEntity));
                break;
            }

            case 'PROJECT_CREATE': {
                setErrors(projectCreateValidation(form as ProjectCreateEntity));
                break;
            }

            case 'IMAGE_EDIT': {
                setErrors(imageEditValidation(form as ImagePreview));
                break;
            }

            case 'PROFILE_IMAGES_ADD': {
                setErrors(profileBackgroundsAddValidation(form as ImagePreview[], prevState as string[]));
                break;
            }

            case 'SOUNDTRACKS_ADD': {
                setErrors(soundtracksAddValidation(form as AudioPreview[]));
                break;
            }

            case 'PROFILE_EDIT': {
                setErrors(profileEditValidation(form as ProfileEditEntity, prevState as ProfileEditEntity));
                break;
            }
        }
    }, [form, prevState]);

    return { errors };
};