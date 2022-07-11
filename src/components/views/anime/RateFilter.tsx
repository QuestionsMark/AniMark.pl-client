import { Dispatch } from "react";
import { FormAction } from "../../../reducers/formReducer";

interface Props {
    min: string;
    max: string;
    dispatch: Dispatch<FormAction>;
}

export const RateFilter = ({ max, min, dispatch }: Props) => {
    return (
        <div className="filter__others--part">
            <h3 className="filter__subtitle filter__subtitle--center">Ocena</h3>
            <div className="filter__rate">
                <input type="number" className="form__inp filter__inp" value={min} placeholder="min" onChange={(e) => dispatch({ type: 'MIN_RATE_CHANGE', payload: e.target.value })} />
                <input type="number" className="form__inp filter__inp" value={max} placeholder="max" onChange={(e) => dispatch({ type: 'MAX_RATE_CHANGE', payload: e.target.value })} />
            </div>
        </div>
    );
};