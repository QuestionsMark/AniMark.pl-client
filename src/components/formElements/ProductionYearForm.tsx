import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: number | null;
    dispatch: Dispatch<FormAction>;
}

export const ProductionYearForm = ({ value, dispatch }: Props) => {
    return (
        <input type="number" className="form__inp" min={1950} max={new Date().getFullYear()} value={value ? String(value) : ''} placeholder="Rok produkcji" onChange={(e) => dispatch({ type: 'PRODUCTION_YEAR_CHANGE', payload: Number(e.target.value) })} />
    );
};