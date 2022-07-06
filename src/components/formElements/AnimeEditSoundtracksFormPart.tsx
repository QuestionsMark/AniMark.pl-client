import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { usePopup } from "../../contexts/popupContext";
import { useValidation } from "../../hooks/useValidation";
import { FormAction } from "../../reducers/formReducer";
import { AudioPreview } from "../../types";
import { fetchWithFileUpload } from "../../utils/fetchHelper";
import { ButtonPlus } from "../common/ButtonPlus";
import { FileDrop } from "./FileDrop";
import { ValidationFormPart } from "./ValidationFormPart";

interface Props {
    soundtracksPreview: AudioPreview[];
    soundtracks: File[] | null;
    maxCount: number;
    title?: string;
    className?: string;
    dispatch: Dispatch<FormAction>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AnimeEditSoundtracksFormPart = ({ dispatch, maxCount, className, title, soundtracks, soundtracksPreview, setRefresh }: Props) => {

    const { animeId } = useParams();
    const { setResponsePopup } = usePopup();

    const { errors } = useValidation(soundtracksPreview, 'SOUNDTRACKS_ADD');

    const handleSoundtracksAdd = async () => {
        if (!soundtracks || soundtracksPreview.length < 1) return;
        const data = new FormData();
        for (const soundtrack of soundtracks) {
            data.append('file', soundtrack);
        }
        data.append('data', JSON.stringify(soundtracksPreview));
        const { message, status } = await fetchWithFileUpload(`anime/${animeId}/soundtracks`, 'POST', data);
        if (!status) return setResponsePopup({ message, open: true, status });
        setResponsePopup({ message, open: true, status });
        setRefresh(state => state === null ? false : !state);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Soundtrack'}</h3>
            <FileDrop defaultValue="Upuść tutaj" fileType="audio" handler={(files) => dispatch({ type: 'SOUNDTRACKS_CHANGE', payload: { value: files, maxCount } })} multiple />
            <ValidationFormPart errors={errors} />
            <ButtonPlus center disabled={errors.length !== 0} handler={handleSoundtracksAdd} className="form__soundtracks-add-btn" >
                Dodaj soundtracki
            </ButtonPlus>
        </div>
    );
};