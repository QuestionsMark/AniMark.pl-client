import { Dispatch } from "react";
import { FormAction } from "../../../reducers/formReducer";
import { TypeAPI } from "../../../types";
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined, IndeterminateCheckBoxOutlined } from "@mui/icons-material";
import { TypeFilterElement } from "./TypeFilterElement";

interface Props {
    types: TypeAPI[];
    unwantedTypes: string[];
    wantedTypes: string[];
    dispatch: Dispatch<FormAction>;
}

export type CheckboxState = 'WE' | 'W' | 'DW';

export const TypesFilter = ({ types, unwantedTypes, wantedTypes, dispatch }: Props) => {

    const getCheckboxState = (id: String): CheckboxState => {
        const isInWanted = wantedTypes.findIndex(t => t === id) !== -1;
        if (isInWanted) return 'W';
        const isInUnwanted = unwantedTypes.findIndex(t => t === id) !== -1;
        if (isInUnwanted) return 'DW';
        return 'WE';
    };

    const typesList = () => {
        return types.map(t => <TypeFilterElement key={t._id} type={t} checkboxState={getCheckboxState(t._id)} dispatch={dispatch} />);
    };

    return (
        <div className="filter__types">
            <div className="filter__types-header">
                <h3 className="filter__subtitle filter__types-title">Gatunki</h3>
                <div className="filter__types-legend">
                    <div className="filter__types-legend-item">
                        <CheckBoxOutlined className="filter__types-legend-icon  filter__types-item-icon--green" />
                        <p className="filter__types-legend-text">Chcę</p>
                    </div>
                    <div className="filter__types-legend-item">
                        <IndeterminateCheckBoxOutlined className="filter__types-legend-icon  filter__types-item-icon--red" />
                        <p className="filter__types-legend-text">Nie chcę</p>
                    </div>
                    <div className="filter__types-legend-item">
                        <CheckBoxOutlineBlankOutlined className="filter__types-legend-icon" />
                        <p className="filter__types-legend-text">Obojętne</p>
                    </div>
                </div>
            </div>
            <ul className="filter__types-list">
                {typesList()}
            </ul>
        </div>
    );
};