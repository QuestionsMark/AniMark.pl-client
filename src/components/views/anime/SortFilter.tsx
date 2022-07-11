import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../../reducers/formReducer";
import { Sort } from "../../../types";

interface Props {
    value: Sort;
    dispatch: Dispatch<FormAction>;
}

export const SortFilter = ({ value, dispatch }: Props) => {
    return (
        <div className="filter__others--part">
            <h3 className="filter__subtitle filter__subtitle--center">Sortowanie</h3>
            <div className="filter__kind">
                <FormControl id="select" className="without-margin">
                    <InputLabel>Kolejność</InputLabel>
                    <Select
                        value={value}
                        onChange={(e) => dispatch({ type: 'SORT_CHANGE', payload: e.target.value as Sort })}
                    >
                        <MenuItem value="alphabetic">Alfabetycznie</MenuItem>
                        <MenuItem value="new">Najnowsze</MenuItem>
                        <MenuItem value="old">Najstarsze</MenuItem>
                        <MenuItem value="best">Najlepsze</MenuItem>
                        <MenuItem value="worst">Najgorsze</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};