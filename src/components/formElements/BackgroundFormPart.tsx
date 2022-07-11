import { Dispatch, SetStateAction, useMemo } from "react";
import { usePopup } from "../../contexts/popupContext";
import { useUser } from "../../contexts/userContext";
import { useValidation } from "../../hooks/useValidation";
import { FormAction } from "../../reducers/formReducer";
import { ImagePreview, ProfileEditEntity } from "../../types";
import { fetchWithFileUpload } from "../../utils/fetchHelper";
import { ButtonPlus } from "../common/ButtonPlus";
import { ProfileBackgroundElement } from "../views/profile/profile-edit/ProfileBackgroundElement";
import { ImagesFormPart } from "./ImagesFormPart";
import { ImagesPreviewFormPart } from "./ImagesPreviewFormPart";
import { ValidationFormPart } from "./ValidationFormPart";

interface Props {
    title?: string;
    className?: string;
    customBackgrounds: string[];
    background: string;
    images: File[] | null;
    preview: ImagePreview[];
    dispatch: Dispatch<FormAction>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const BackgroundFormPart = ({ className, customBackgrounds, dispatch, images, preview, title, background, setRefresh }: Props) => {

    const { user } = useUser();
    const { setResponsePopup } = usePopup();
    const { errors } = useValidation(preview, 'PROFILE_IMAGES_ADD', customBackgrounds);

    const handleBackgroundsAdd = async () => {
        if (!images) return;
        const data = new FormData();
        for (const img of images) {
            data.append('file', img);
        }
        const { message, status } = await fetchWithFileUpload(`users/${user.userId}/background`, 'POST', data);
        setResponsePopup({ message, open: true, status });
        if (!status) return;
        dispatch({ type: 'IMAGES_DELETE_ALL' });
        setRefresh(state => state === null ? false : !state);
    };

    const backgroundsList = () => {
        return customBackgrounds.map(b => <ProfileBackgroundElement key={b} background={b} isActive={background === b} setRefresh={setRefresh} />);
    };

    const imagesPreviewFormPartComponent = useMemo(() => <ImagesPreviewFormPart dispatch={dispatch} preview={preview} sizeLimit={524288} />, [preview]);

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Tło'}</h3>
            <div className="form__backgrounds-content">
                <ul className="form__backgrounds-list">
                    {backgroundsList()}
                </ul>
                {customBackgrounds.length < 5 && <>
                    <ImagesFormPart dispatch={dispatch} title="Dodaj własne tło" />
                    {imagesPreviewFormPartComponent}
                    <ValidationFormPart errors={errors} />
                    <ButtonPlus center disabled={errors.length !== 0} handler={handleBackgroundsAdd} >
                        Dodaj nowe tła
                    </ButtonPlus>
                </>}
            </div>
        </div>
    );
};