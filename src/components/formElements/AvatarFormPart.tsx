import { Dispatch, SetStateAction } from "react";
import { useValidation } from "../../hooks/useValidation";
import { FormAction } from "../../reducers/formReducer";
import { ImagePreview } from "../../types";
import { ButtonPlus } from "../common/ButtonPlus";
import { Image } from "../common/Image";
import { FileDrop } from "./FileDrop";
import { ValidationFormPart } from "./ValidationFormPart";

import transparent from '../../images/transparent.png';
import { fetchWithFileUpload } from "../../utils/fetchHelper";
import { useUser } from "../../contexts/userContext";
import { usePopup } from "../../contexts/popupContext";

interface Props {
    title?: string;
    className?: string;
    actualAvatar: string;
    avatarPreview: ImagePreview;
    avatar: File | null;
    dispatch: Dispatch<FormAction>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AvatarFormPart = ({ className, title, avatar, actualAvatar, avatarPreview, dispatch, setRefresh }: Props) => {

    const { user } = useUser();
    const { setResponsePopup } = usePopup();
    const { errors } = useValidation(avatarPreview, 'IMAGE_EDIT');

    const handleImagesChange = (files: File[] | null) => {
        if (files && files.length > 0) {
            dispatch({ type: "AVATAR_CHANGE", payload: files });
        }
    };

    const handleAvatarChange = async () => {
        if (!avatar) return;
        const data = new FormData();
        data.append('file', avatar);
        const { message, status } = await fetchWithFileUpload(`users/${user.userId}/avatar`, 'PUT', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        dispatch({ type: 'AVATAR_CHANGE', payload: null });
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Avatar'}</h3>
            <div className="form__avatar-container">
                <div className="form__avatar-content">
                    <div className="form__avatar-preview">
                        <Image alt="Obecny avatar" src={actualAvatar} className="form__avatar-img" />
                    </div>
                    <div className="form__avatar-preview">
                        <Image alt="Obecny avatar" src={avatarPreview.src || transparent} className="form__avatar-img" isStatic />
                        <FileDrop defaultValue="Upuść nowy avatar" fileType="image" handler={handleImagesChange} customClassName="form__avatar-filedrop" />
                    </div>
                </div>
                <ValidationFormPart errors={errors} />
                <ButtonPlus center disabled={errors.length !== 0} handler={handleAvatarChange} >
                    Aktualizuj avatar
                </ButtonPlus>
            </div>
        </div>
    );
};