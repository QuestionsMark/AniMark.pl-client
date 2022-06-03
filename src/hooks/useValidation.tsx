import { useEffect, useState } from "react";
import { LoginFormEntity, loginValidation } from "../validation/login";
import { registartionValidation, RegistrationFormEntity } from "../validation/registraction";

type ValidationType = "LOGIN" | "REGISTRATION";

type FormEntity = LoginFormEntity | RegistrationFormEntity;

export const useValidation = (form: FormEntity, type: ValidationType) => {

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        switch (type) {
            case 'LOGIN': {
                setErrors(loginValidation(form));
                break;
            }

            case 'REGISTRATION': {
                setErrors(registartionValidation(form as RegistrationFormEntity));
                break;
            }
        }
    }, [form]);

    return { errors };
};