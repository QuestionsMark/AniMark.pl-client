import { Button } from "@mui/material";
import { ReactNode, SyntheticEvent } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    handler?: () => void;
    center?: boolean;
}

export const ButtonPlus = ({ center, children, className, disabled, handler }: Props) => {

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        if (handler) {
            handler();
        }
    };

    return (
        <Button id={center ? 'btn-center' : 'btn'} className={`${className ? className : ''}`} disabled={disabled} onClick={handleClick}>
            {children}
        </Button>
    );
};