import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    hours: number | null;
    minutes: number | null;
    dispatch: Dispatch<FormAction>;
}

export const MovieDurationForm = ({ hours, minutes, dispatch }: Props) => {
    return (
        <div className="form__anime-info-section">
            <input type="number" className="form__inp" min={0} max={1000} value={hours ? String(hours) : ''} placeholder="Ilość godzin" onChange={(e) => dispatch({ type: 'HOURS_CHANGE', payload: Number(e.target.value) })} />
            <input type="number" className="form__inp" min={0} max={59} value={minutes ? String(minutes) : ''} placeholder="Ilość minut" onChange={(e) => dispatch({ type: 'MINUTES_CHANGE', payload: Number(e.target.value) })} />
        </div>
    );
};