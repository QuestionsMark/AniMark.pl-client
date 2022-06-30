import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { OtherLink } from "../../types";
import { DeleteButton } from "../common/DeleteButton";

interface Props {
    index: number;
    link: OtherLink;
    dispatch: Dispatch<FormAction>;
}

export const LinkFormElement = ({ index, link, dispatch }: Props) => {
    return (
        <li className="form__other-links-item">
            <input
                type="text"
                className="form__inp form__inp--item"
                placeholder="Link do zasobu"
                value={link.src}
                onChange={(e) => dispatch({ type: 'LINKS_CHANGE', payload: { index, type: 'SRC', value: e.target.value } })}
            />
            <input
                type="text"
                className="form__inp form__inp--item"
                placeholder="Tytuł linku"
                value={link.note}
                onChange={(e) => dispatch({ type: 'LINKS_CHANGE', payload: { index, type: 'NOTE', value: e.target.value } })}
            />
            <DeleteButton handler={() => dispatch({ type: 'LINKS_DELETE', payload: index })} />
        </li>
    );
};