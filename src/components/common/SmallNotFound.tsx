import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export const SmallNotFound = () => {
    const { pathname } = useLocation();
    return (
        <div className="not-found__content">
            <FontAwesomeIcon icon={faTriangleExclamation} className="not-found__icon" />
            <p className="not-found__text">Nie znaeziono zasobu dla tego adresu: https://animark.pl{pathname}</p>
        </div>
    );
};