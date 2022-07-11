import { Image } from "./Image";

import loadingImg from "../../images/loading.gif";

export const Loading = () => {
    return (
        <div className="loading">
            <div className="loading__img-wrapper">
                <Image alt="Ładowanie..." src={loadingImg} isStatic />
            </div>
        </div>
    );
}