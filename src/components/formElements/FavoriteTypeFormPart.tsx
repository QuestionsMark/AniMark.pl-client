import { FormControl, MenuItem, Select } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { TypeFormListAPI } from "../../types";

interface Props {
    title?: string;
    className?: string;
    value: string;
    types: TypeFormListAPI[];
    dispatch: Dispatch<FormAction>;
}

export const FavoriteTypeFormPart = ({ className, title, value, types, dispatch }: Props) => {

    const formAnimeList = () => {
        if (!types) return;
        return types.map(t => <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Ulubiony gatunek'}</h3>
            <FormControl id="select">
                <Select
                    value={value}
                    onChange={(e) => dispatch({ type: 'FAVORITE_TYPE_CHANGE', payload: e.target.value })}
                >
                    <MenuItem value="">
                        Brak
                    </MenuItem>
                    {formAnimeList()}
                </Select>
            </FormControl>
        </div>
    );
};