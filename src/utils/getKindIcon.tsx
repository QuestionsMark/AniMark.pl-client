import { faClapperboard, faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Kind } from "../types";

export const getKindIcon = (kind: Kind, className: string = '') => {
    switch (kind) {
        case 'movie':
            return <FontAwesomeIcon icon={faFilm} className={className} />;

        case 'series':
            return <FontAwesomeIcon icon={faClapperboard} className={className} />;
    }
};