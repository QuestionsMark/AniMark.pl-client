import { Button } from "@mui/material";
import { ReactNode, SyntheticEvent } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    handler?: () => void;
}

export const ButtonPlus = ({ children, className, handler }: Props) => {

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        if (handler) {
            handler();
        }
    };

    return (
        <Button id="btn" className={`${className ? className : ''}`} onClick={handleClick}>
            {children}
        </Button>
    );
};