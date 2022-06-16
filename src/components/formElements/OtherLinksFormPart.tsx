import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { OtherLink } from "../../types";
import { AddButton } from "../common/AddButton";
import { OtherLinkFormElement } from "./OtherLinkFormElement";

interface Props {
    title?: string;
    className?: string;
    maxCount?: number;
    value: OtherLink[];
    dispatch: Dispatch<FormAction>;
}

export const OtherLinksFormPart = ({ className, maxCount, title, value, dispatch }: Props) => {

    const otherLinksList = () => {
        return value.map((l, i) => <OtherLinkFormElement key={String(i)} dispatch={dispatch} index={i} link={l} />)
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Odnośniki'}</h3>
            <ul className="form__other-links-list">
                {otherLinksList()}
                {value.length < (maxCount ? maxCount : 50) && <AddButton handler={() => dispatch({ type: 'OTHER_LINKS_ADD' })} />}
            </ul>
        </div>
    );
};