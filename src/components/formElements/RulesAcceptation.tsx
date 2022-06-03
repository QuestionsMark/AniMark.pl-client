import { FormControlLabel, Checkbox } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: boolean;
    dispatch: Dispatch<FormAction>;
}

export const RulesAcceptation = ({ value, dispatch }: Props) => {
    return (
        <FormControlLabel id="checkbox" control={<Checkbox className="form__checkbox" checked={value} onChange={(e) => dispatch({ type: 'RULES_ACCEPTATION_CHANGE', payload: e.target.checked })} />} label="Oświadczam, że zapoznałem się z regulaminem platformy i zobowiązuję się do jego przestrzegania." />
    );
};