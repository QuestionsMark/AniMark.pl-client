import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { DeleteButton } from "../common/DeleteButton";

interface Props {
    index: number;
    src: string;
    dispatch: Dispatch<FormAction>;
}

export const VideoFormElement = ({ index, src, dispatch }: Props) => {
    return (
        <li className="form__videos-item">
            <input
                type="text"
                className="form__inp form__inp--item"
                placeholder="Link !SHARE! YouTube"
                value={src}
                onChange={(e) => dispatch({ type: 'VIDEOS_CHANGE', payload: { index, value: e.target.value } })}
            />
            <DeleteButton handler={() => dispatch({ type: 'VIDEOS_DELETE', payload: index })} />
        </li>
    );
};