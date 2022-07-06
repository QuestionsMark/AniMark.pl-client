import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../contexts/popupContext";
import { useValidation } from "../../hooks/useValidation";
import { FormAction } from "../../reducers/formReducer";
import { AnimeCreatePreview } from "../../types";
import { fetchWithFileUpload } from "../../utils/fetchHelper";
import { ButtonPlus } from "../common/ButtonPlus";
import { AnimeCreateImagePreviewElement } from "./AnimeCreateImagePreviewElement";
import { FileDrop } from "./FileDrop";
import { ValidationFormPart } from "./ValidationFormPart";

interface Props {
    title?: string;
    className?: string;
    preview: AnimeCreatePreview;
    sizeLimit: number;
    backgroundFile: File | null;
    banerFile: File | null;
    miniFile: File | null;
    dispatch: Dispatch<FormAction>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AnimeEditImagesFormPart = ({ dispatch, className, title, preview, sizeLimit, backgroundFile, banerFile, miniFile, setRefresh }: Props) => {

    const { background, baner, mini } = preview;

    const { animeId } = useParams();
    const { setResponsePopup } = usePopup();

    const { errors: backgroundErrors } = useValidation(background, 'IMAGE_EDIT');
    const { errors: banerErrors } = useValidation(baner, 'IMAGE_EDIT');
    const { errors: miniErrors } = useValidation(mini, 'IMAGE_EDIT');

    const handleBackgroundEdit = async () => {
        if (!backgroundFile) return;
        const data = new FormData();
        data.append('file', backgroundFile);
        const { message, status } = await fetchWithFileUpload(`anime/${animeId}/background`, 'PUT', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };
    const handleBanerEdit = async () => {
        if (!banerFile) return;
        const data = new FormData();
        data.append('file', banerFile);
        const { message, status } = await fetchWithFileUpload(`anime/${animeId}/baner`, 'PUT', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };
    const handleMiniEdit = async () => {
        if (!miniFile) return;
        const data = new FormData();
        data.append('file', miniFile);
        const { message, status } = await fetchWithFileUpload(`anime/${animeId}/mini`, 'PUT', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Edytuj grafiki'}</h3>
            <div className="form__anime-saved-images-containter">
                <div className="form__anime-saved-images-part">
                    <AnimeCreateImagePreviewElement isStatic={background.src.slice(0, 5) === 'blob:'} preview={background} sizeLimit={sizeLimit} title="Tło" />
                    <FileDrop defaultValue="Upuśc tło" fileType="image" handler={(files) => dispatch({ type: 'BACKGROUND_CHANGE', payload: files })} />
                    <ValidationFormPart errors={backgroundErrors} />
                    <ButtonPlus disabled={backgroundErrors.length !== 0} center handler={handleBackgroundEdit} className="form__anime-saved-images-submit">
                        Aktualizuj tło
                    </ButtonPlus>
                </div>
                <div className="form__anime-saved-images-part">
                    <AnimeCreateImagePreviewElement isStatic={baner.src.slice(0, 5) === 'blob:'} preview={baner} sizeLimit={sizeLimit} title="Baner" />
                    <FileDrop defaultValue="Upuśc baner" fileType="image" handler={(files) => dispatch({ type: 'BANER_CHANGE', payload: files })} />
                    <ValidationFormPart errors={banerErrors} />
                    <ButtonPlus disabled={banerErrors.length !== 0} center handler={handleBanerEdit} className="form__anime-saved-images-submit">
                        Aktualizuj baner
                    </ButtonPlus>
                </div>
                <div className="form__anime-saved-images-part">
                    <AnimeCreateImagePreviewElement isStatic={mini.src.slice(0, 5) === 'blob:'} preview={mini} sizeLimit={sizeLimit} title="Okładka" />
                    <FileDrop defaultValue="Upuśc okładkę" fileType="image" handler={(files) => dispatch({ type: 'MINI_CHANGE', payload: files })} />
                    <ValidationFormPart errors={miniErrors} />
                    <ButtonPlus disabled={miniErrors.length !== 0} center handler={handleMiniEdit} className="form__anime-saved-images-submit">
                        Aktualizuj okładkę
                    </ButtonPlus>
                </div>
            </div>
        </div>
    );
};