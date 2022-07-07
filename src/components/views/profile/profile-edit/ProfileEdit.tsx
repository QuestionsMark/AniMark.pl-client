import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../../../contexts/popupContext";
import { useUser } from "../../../../contexts/userContext";
import { useData } from "../../../../hooks/useData";
import { useValidation } from "../../../../hooks/useValidation";
import { FormAction, formReducer } from "../../../../reducers/formReducer";
import { ProfileAPI, ProfileEditEntity, TypeFormListAPI } from "../../../../types";
import { fetchApiTool, fetchTool } from "../../../../utils/fetchHelper";
import { Loading } from "../../../common/Loading";
import { SmallNotFound } from "../../../common/SmallNotFound";
import { SubmitButton } from "../../../common/SubmitButton";
import { AvatarFormPart } from "../../../formElements/AvatarFormPart";
import { BackgroundFormPart } from "../../../formElements/BackgroundFormPart";
import { FavoriteTypeFormPart } from "../../../formElements/FavoriteTypeFormPart";
import { IntroductionFormPart } from "../../../formElements/IntroductionFormPart";
import { UsernameFormPart } from "../../../formElements/UsernameFormPart";
import { ValidationFormPart } from "../../../formElements/ValidationFormPart";

interface Props {
    profile: ProfileAPI;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const ProfileEdit = ({ profile, setRefresh }: Props) => {

    const { avatar, background, customBackgrounds, favoriteType, username, introduction } = profile;

    const [profileEditState, setProfileEditState] = useState<ProfileEditEntity>({
        avatar: null,
        profileBackground: background,
        favoriteType: favoriteType ? favoriteType._id : '',
        username,
        introduction,
        avatarPreview: {
            size: 0,
            src: '',
        },
        images: null,
        preview: [],
    })

    const componentRef = useRef(null);
    const { user, setUser } = useUser();
    const { userId } = useParams();
    const { setResponsePopup } = usePopup();

    const { data: types } = useData<TypeFormListAPI[]>('types/form', componentRef);
    const [state, dispatch] = useReducer(formReducer, profileEditState) as [ProfileEditEntity, Dispatch<FormAction>];
    const { errors } = useValidation(state, 'PROFILE_EDIT', profileEditState);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { message, status } = await fetchTool(`users/${user.userId}`, 'PATCH', state);
        setResponsePopup({ message, open: true, status });
        if (!status) return;
        dispatch({ type: 'FORM_SET', payload: state });
        setRefresh(state => state === null ? false : !state);
        const dataResponse = await fetchApiTool(`users/${user.userId}/user-data`);
        if (!dataResponse.status) return setResponsePopup({ message: dataResponse.message, open: true, status: dataResponse.status });
        setUser(state => ({ ...state, data: dataResponse.results }));
    };

    const avatarFormPartComponent = useMemo(() => <AvatarFormPart dispatch={dispatch} avatar={state.avatar} actualAvatar={avatar} avatarPreview={state.avatarPreview} className="main__subsection" setRefresh={setRefresh} />, [avatar, setRefresh, state.avatar, state.avatarPreview]);

    const usernameFormPartComponent = useMemo(() => <UsernameFormPart dispatch={dispatch} value={state.username} className="main__subsection" />, [state.username]);

    const introductionFormPartComponent = useMemo(() => <IntroductionFormPart dispatch={dispatch} value={state.introduction} className="main__subsection" />, [state.introduction]);

    const favoriteTypeFormPartComponent = useMemo(() => <FavoriteTypeFormPart dispatch={dispatch} value={state.favoriteType} types={types} className="main__subsection" />, [state.favoriteType, types]);

    const backgroundFormPartComponent = useMemo(() => <BackgroundFormPart dispatch={dispatch} images={state.images} preview={state.preview} setRefresh={setRefresh} customBackgrounds={customBackgrounds} background={background} className="main__subsection form__backgrounds" />, [background, customBackgrounds, setRefresh, state.images, state.preview]);

    useEffect(() => {
        setProfileEditState(state => ({
            avatar: state.avatar,
            profileBackground: background,
            favoriteType: favoriteType ? favoriteType._id : '',
            username,
            introduction,
            avatarPreview: state.avatarPreview,
            images: state.images,
            preview: state.preview,
        }))
    }, [profile]);

    return (
        <div ref={componentRef} className="profile-edit">
            {user.userId && user.userId === userId ? types ? <form className="profile-edit__form" onSubmit={handleSubmit}>
                {avatarFormPartComponent}
                {backgroundFormPartComponent}
                {usernameFormPartComponent}
                {introductionFormPartComponent}
                {favoriteTypeFormPartComponent}
                <div className="main__subsection">
                    <SubmitButton errors={errors.length} value="Aktualizuj profil" className="news__submit" />
                    <ValidationFormPart errors={errors} />
                </div>
            </form> : <Loading /> : <SmallNotFound />}
        </div>
    );
};