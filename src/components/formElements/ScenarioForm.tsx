import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const ScenarioForm = ({ value, dispatch }: Props) => {
    return (
        <input type="text" className="form__inp" value={value} placeholder="Autor" onChange={(e) => dispatch({ type: 'SCENARIO_CHANGE', payload: e.target.value })} />
    );
};