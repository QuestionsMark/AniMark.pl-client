import { Dispatch, SetStateAction } from "react";
import { FormAction } from "../../reducers/formReducer";
import { Soundtrack } from "../../types";
import { SavedSoundtrackFormElement } from "./SavedSoundtrackFormElement";

interface Props {
    soundtracks: Soundtrack[];
    path: string;
    className?: string;
    title?: string;
    dispatch: Dispatch<FormAction>;
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const SavedSoundtracksFormPart = ({ dispatch, path, setRefresh, soundtracks, className, title }: Props) => {
    const soundtraksList = () => {
        return soundtracks.map((s, i) => <SavedSoundtrackFormElement key={s.id} dispatch={dispatch} index={i} path={path} setRefresh={setRefresh} soundtrack={s} />);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Edytuj obecne soundtracki'}</h3>
            <ul className="form__saved-soundtracks-list">
                {soundtraksList()}
            </ul>
        </div>
    );
};