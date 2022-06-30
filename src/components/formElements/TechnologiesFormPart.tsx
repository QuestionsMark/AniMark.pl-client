import { Checkbox, FormControlLabel } from "@mui/material";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: string[];
    className?: string;
    title?: string;
    dispatch: Dispatch<FormAction>;
}

const TECHNOLOGIES: string[] = ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 'Bootstrap', 'Socket.io', 'MongoDB', 'NestJS', 'SQL', 'ExpressJS', 'NodeJS', 'Jest'];

export const TechnologiesFormPart = ({ value, className, title, dispatch }: Props) => {

    const isChecked = (tech: string) => {
        return value.findIndex(s => s === tech) !== -1;
    };

    const technologiesList = () => {
        return TECHNOLOGIES.map(t => <FormControlLabel
            key={t}
            control={
                <Checkbox checked={isChecked(t)} value={t} onChange={(e) => dispatch({ type: 'TECHNOLOGIES_CHANGE', payload: e.target.value })} />
            }
            label={t}
        />);
    };

    return (
        <div className={className ? className : ''}>
            <h3 className="form__subtitle">{title ? title : 'Technologie*'}</h3>
            <ul className="form__seasons-list">
                {technologiesList()}
            </ul>
        </div>
    );
};