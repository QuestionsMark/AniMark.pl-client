import { Dispatch } from "react";
import { FormAction } from "../../../reducers/formReducer";
import { TypeAPI } from "../../../types";
import { CheckboxState } from "./TypesFilter";
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined, IndeterminateCheckBoxOutlined } from "@mui/icons-material";
import Popup from "reactjs-popup";

interface Props {
    type: TypeAPI;
    checkboxState: CheckboxState;
    dispatch: Dispatch<FormAction>;
}

export const TypeFilterElement = ({ checkboxState, type, dispatch }: Props) => {

    const getClassName = () => {
        switch (checkboxState) {
            case 'WE':
                return '';
            case 'W':
                return ' filter__types-item-icon--green';
            case 'DW':
                return ' filter__types-item-icon--red';
        }
    };

    const getIcon = () => {
        switch (checkboxState) {
            case 'WE':
                return <CheckBoxOutlineBlankOutlined className={`filter__types-item-icon${getClassName()}`} onClick={() => dispatch({ type: 'TYPES_FILTER_CHANGE', payload: { checkboxState, id: type._id } })} />;
            case 'W':
                return <CheckBoxOutlined className={`filter__types-item-icon${getClassName()}`} onClick={() => dispatch({ type: 'TYPES_FILTER_CHANGE', payload: { checkboxState, id: type._id } })} />;
            case 'DW':
                return <IndeterminateCheckBoxOutlined className={`filter__types-item-icon${getClassName()}`} onClick={() => dispatch({ type: 'TYPES_FILTER_CHANGE', payload: { checkboxState, id: type._id } })} />;
        }
    }

    return (
        <li className="filter__types-item">
            <Popup
                className="normal-popup"
                trigger={<p className="filter__types-item-name">{type.name}</p>}
                position="top center"
            >
                {type.description}
            </Popup>
            {getIcon()}
        </li>
    );
};