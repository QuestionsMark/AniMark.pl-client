import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { TypeFormListAPI } from "../../types";

interface Props {
    className?: string;
    title?: string;
    types: TypeFormListAPI[];
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const TypesFormPart = ({ dispatch, value, types, className, title }: Props) => {

    const isChecked = (type: string) => {
        return value.findIndex(t => t === type) !== -1;
    };

    const typesList = () => {
        return types.map(t => <FormControlLabel
            key={t._id}
            control={
                <Checkbox checked={isChecked(t._id)} value={t._id} onChange={(e) => dispatch({ type: 'TYPES_CHANGE', payload: e.target.value })} />
            }
            label={t.name}
        />)
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Wybierz gatunki'}</h3>
            <ul className="form__types-list">
                {typesList()}
            </ul>
        </div>
    );
};