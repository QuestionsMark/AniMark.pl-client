import { Dispatch, useMemo } from "react";
import { FormAction } from "../../../reducers/formReducer";
import { FiltersEntity } from "./Anime";
import { KindFilter } from "./KindFilter";
import { RateFilter } from "./RateFilter";
import { SortFilter } from "./SortFilter";
import { TypeAPI } from "../../../types";
import { TypesFilter } from "./TypesFilter";

interface Props {
    state: FiltersEntity;
    types: TypeAPI[];
    dispatch: Dispatch<FormAction>;
}

export const Filter = ({ state, types, dispatch }: Props) => {
    const kindFilterComponent = useMemo(() => <KindFilter value={state.kind} dispatch={dispatch} />, [state.kind]);
    const rateFilterComponent = useMemo(() => <RateFilter max={state.maxRate} min={state.minRate} dispatch={dispatch} />, [state.maxRate, state.minRate]);
    const sortFilterComponent = useMemo(() => <SortFilter value={state.sort} dispatch={dispatch} />, [state.sort]);
    const typesFilterComponent = useMemo(() => <TypesFilter dispatch={dispatch} types={types} unwantedTypes={state.unwantedTypes} wantedTypes={state.wantedTypes} />, [state.unwantedTypes, state.wantedTypes, types]);

    return (
        <div className="main__section">
            <div className="filter__container">
                <div className="filter__others">
                    {kindFilterComponent}
                    {rateFilterComponent}
                    {sortFilterComponent}
                </div>
                {typesFilterComponent}
            </div>
        </div>
    );
};