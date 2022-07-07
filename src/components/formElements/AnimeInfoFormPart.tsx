import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { Kind } from "../../types";
import { MovieDurationForm } from "./MovieDurationForm";
import { ProductionYearForm } from "./ProductionYearForm";
import { ScenarioForm } from "./ScenarioForm";
import { SeriesDurationForm } from "./SeriesDurationForm";

interface Props {
    className?: string;
    scenario: string;
    productionYear: number | null;
    kind: Kind;
    epizodesCount: number | null;
    epizodeDuration: number | null;
    hours: number | null;
    minutes: number | null;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

export const AnimeInfoFormPart = ({ epizodeDuration, epizodesCount, hours, kind, minutes, productionYear, scenario, className, title, dispatch }: Props) => {
    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Ogólne Informacje'}</h3>
            <div className="form__anime-info-section">
                <ScenarioForm dispatch={dispatch} value={scenario} />
                <ProductionYearForm dispatch={dispatch} value={productionYear} />
            </div>
            {kind === "series" && <SeriesDurationForm dispatch={dispatch} epizodeDuration={epizodeDuration} epizodesCount={epizodesCount} />}
            {kind === "movie" && <MovieDurationForm dispatch={dispatch} hours={hours} minutes={minutes} />}
        </div>
    );
};