import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export const NotFound = () => {

    const { pathname } = useLocation();
    console.log(pathname);
    

    return (
        <main className="main__content not-found">
            <div className="not-found__content">
                <FontAwesomeIcon icon={faTriangleExclamation} className="not-found__icon" />
                <p className="not-found__text">Nie znaeziono zasobu dla tego adresu: https://animark.pl{pathname}</p>
            </div>
        </main>
    );
};