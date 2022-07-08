import { Dispatch, FormEvent, SetStateAction, useMemo, useReducer } from "react";
import { usePopup } from "../../../../contexts/popupContext";
import { useUser } from "../../../../contexts/userContext";
import { useValidation } from "../../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../../reducers/formReducer";
import { PrivacyEditEntity } from "../../../../types";
import { fetchTool } from "../../../../utils/fetchHelper";
import { SubmitButton } from "../../../common/SubmitButton";
import { ConfirmPasswordFormPart } from "../../../formElements/ConfirmPasswordFormPart";
import { EmailFormPart } from "../../../formElements/EmailFormPart";
import { LoginFormPart } from "../../../formElements/LoginFormPart";
import { PasswordFormPart } from "../../../formElements/PasswordFormPart";
import { ValidationFormPart } from "../../../formElements/ValidationFormPart";

interface Props {
    privacyEditState: PrivacyEditEntity;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const ProfilePrivacySettingsForm = ({ privacyEditState, setRefresh }: Props) => {

    const { user } = useUser();
    const { setResponsePopup } = usePopup();

    const [state, dispatch] = useReducer(formReducer, privacyEditState) as [PrivacyEditEntity, Dispatch<FormAction>];
    const { errors } = useValidation(state, 'PROFILE_PRIVACY_EDIT', privacyEditState);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { message, status } = await fetchTool(`users/${user.userId}/privacy`, 'PUT', state);
        setResponsePopup({ message, open: true, status });
        if (!status) return;
        dispatch({ type: 'FORM_SET', payload: { email: state.email, login: state.login, password: '', passwordAgain: '', passwordConfirm: '' } });
        setRefresh(state => state === null ? false : !state);
    };

    const emailFormPartComponent = useMemo(() => <EmailFormPart dispatch={dispatch} value={state.email} className="main__subsection" />, [state.email]);
    const loginFormPartComponent = useMemo(() => <LoginFormPart dispatch={dispatch} value={state.login} className="main__subsection" />, [state.login]);
    const passwordFormPartComponent = useMemo(() => <PasswordFormPart dispatch={dispatch} password={state.password} passwordAgain={state.passwordAgain} className="main__subsection" />, [state.password, state.passwordAgain]);
    const confirmFormPartComponent = useMemo(() => <ConfirmPasswordFormPart dispatch={dispatch} value={state.passwordConfirm} />, [state.passwordConfirm]);

    return (
        <form className="profile-privacy-settings__form" onSubmit={handleSubmit} autoComplete="off">
            <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
            {emailFormPartComponent}
            {loginFormPartComponent}
            {passwordFormPartComponent}
            <div className="main__subsection form__confirm-password">
                {confirmFormPartComponent}
                <ValidationFormPart errors={errors} />
                <SubmitButton errors={errors.length} value="Zaktualizuj" className="profile-privacy-settings__form-submit" />
            </div>
        </form>
    );
};