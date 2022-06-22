import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { Kind } from "../../types";

interface Props {
    className?: string;
    value: Kind;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const KindFormPart = ({ value, className, title, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Rodzaj'}</h3>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    className="form__kind-list my"
                    value={value}
                    onChange={(e) => dispatch({ type: 'KIND_CHANGE', payload: e.target.value as Kind })}
                >
                    <FormControlLabel value="series" control={<Radio />} label="seria" />
                    <FormControlLabel value="movie" control={<Radio />} label="film" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};