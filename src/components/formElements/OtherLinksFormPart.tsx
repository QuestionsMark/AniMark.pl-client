import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { OtherLink } from "../../types";
import { AddButton } from "../common/AddButton";
import { LinkFormElement } from "./LinkFormElement";
import { OtherLinkFormElement } from "./OtherLinkFormElement";

interface Props {
    value: OtherLink[];
    className?: string;
    isStatic?: boolean;
    maxCount?: number;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const OtherLinksFormPart = ({ className, isStatic, maxCount, title, value, dispatch }: Props) => {

    const otherLinksList = () => {
        return value.map((l, i) => isStatic ? <LinkFormElement key={String(i)} dispatch={dispatch} index={i} link={l} /> : <OtherLinkFormElement key={String(i)} dispatch={dispatch} index={i} link={l} />);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Odnośniki'}</h3>
            <ul className="form__other-links-list">
                {otherLinksList()}
                {value.length < (maxCount ? maxCount : 50) && <AddButton handler={() => dispatch({ type: isStatic ? 'LINKS_ADD' : 'OTHER_LINKS_ADD' })} />}
            </ul>
        </div>
    );
};