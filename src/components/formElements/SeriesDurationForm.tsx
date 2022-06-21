import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    epizodesCount: number | null;
    epizodeDuration: number | null;
    dispatch: Dispatch<FormAction>;
}

export const SeriesDurationForm = ({ epizodeDuration, epizodesCount, dispatch }: Props) => {
    return (
        <div className="form__anime-info-section">
            <input type="number" className="form__inp" min={1} max={10000} value={epizodesCount ? String(epizodesCount) : ''} placeholder="Ilość odcinków" onChange={(e) => dispatch({ type: 'EPIZODES_COUNT_CHANGE', payload: Number(e.target.value) })} />
            <input type="number" className="form__inp" min={1} max={1000} value={epizodeDuration ? String(epizodeDuration) : ''} placeholder="Długość odcinka (min)" onChange={(e) => dispatch({ type: 'EPIZODE_DURATION_CHANGE', payload: Number(e.target.value) })} />
        </div>
    );
};