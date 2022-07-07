import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { FileDrop } from "./FileDrop";

interface Props {
    maxCount: number;
    title?: string;
    className?: string;
    dispatch: Dispatch<FormAction>;
}

export const SoundtracksFormPart = ({ dispatch, maxCount, className, title }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Soundtrack'}</h3>
            <FileDrop defaultValue="Upuść tutaj" fileType="audio" handler={(files) => dispatch({ type: 'SOUNDTRACKS_CHANGE', payload: { value: files, maxCount } })} multiple />
        </div>
    );
};