import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    index: number;
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const SoundtrackTitleForm = ({ dispatch, index, value }: Props) => {
    return (
        <input type="text" className="form__inp form__inp--item" placeholder="Tytuł" value={value} onChange={(e) => dispatch({ type: 'SOUNDTRACKS_TITLE_CHANGE', payload: { index, value: e.target.value } })} />
    );
};