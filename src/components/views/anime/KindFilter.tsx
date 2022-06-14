import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../../reducers/formReducer";
import { Kind } from "../../../types";

interface Props {
    value: Kind;
    dispatch: Dispatch<FormAction>;
}

export const KindFilter = ({ value, dispatch }: Props) => {
    return (
        <div className="filter__others--part">
            <h3 className="filter__subtitle filter__subtitle--center">Rodzaj</h3>
            <div className="filter__kind">
                <FormControl>
                    <InputLabel>Rodzaj</InputLabel>
                    <Select
                        value={value}
                        onChange={(e) => dispatch({ type: 'KIND_CHANGE', payload: e.target.value as Kind })}
                    >
                        <MenuItem value="all">Wszystko</MenuItem>
                        <MenuItem value="series">Seria odcinków</MenuItem>
                        <MenuItem value="movie">Film</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};