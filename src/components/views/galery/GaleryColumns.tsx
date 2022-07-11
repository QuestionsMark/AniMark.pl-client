import { useRef } from "react";
import { galeryAPI } from "../../../types";
import { GALERY_LIMIT } from "../../../utils/dataLimit";
import { Columns } from "./Galery";
import { GaleryFolderElement } from "./GaleryFolderElement";

interface Props {
    columns: Columns;
    lastDataElementRef: (node: HTMLLIElement) => void;
}

export const GaleryColumns = ({ columns, lastDataElementRef }: Props) => {

    const htmlRef = useRef<HTMLElement>(document.querySelector('html'));

    const getClassName = () => {
        if (!htmlRef.current) return '';
        if (htmlRef.current.clientWidth >= 780) return ' galery__column-container--four';
        if (htmlRef.current.clientWidth >= 600 && htmlRef.current.clientWidth < 780) return ' galery__column-container--three';
        if (htmlRef.current.clientWidth >= 500 && htmlRef.current.clientWidth < 600) return ' galery__column-container--two';
        return ' galery__column-container--one';
    }

    const getCount = () => {
        if (!htmlRef.current) return 1;
        if (htmlRef.current.clientWidth >= 780) return 4;
        if (htmlRef.current.clientWidth >= 600 && htmlRef.current.clientWidth < 780) return 3;
        if (htmlRef.current.clientWidth >= 500 && htmlRef.current.clientWidth < 600) return 2;
        return 1;
    }

    const folderList = (images: galeryAPI[], column: number) => {
        return images.map((f, i) => <GaleryFolderElement key={f._id} folder={f} observer={(i + 1) % (GALERY_LIMIT / 4) === 0 && column === getCount() ? lastDataElementRef : undefined} />);
    };

    const columnsList = () => {
        if (!htmlRef.current) return;
        let columnsCount = getCount();
        const columns2: any[] = [];
        for (let i = 1; i <= columnsCount; i++) {
            columns2.push(<div key={String(i)} className="galery__column">
                {folderList((columns as any)[`column${i}`], i)}
            </div>)
        }

        return columns2;
    };

    return (
        <div className={`galery__column-container${getClassName()}`}>
            {columnsList()}
        </div>
    );
};