import { Image } from "./Image";

import loadingImg from "../../images/loading.gif";

interface Props {
    marginVertical: number;
    marginHorizontal: number;
}

export const LoadingWithMargin = ({ marginHorizontal, marginVertical }: Props) => {
    return (
        <div className="loading">
            <div className="loading__img-wrapper" style={{ margin: `${marginVertical}px ${marginHorizontal}px` }}>
                <Image alt="Ładowanie..." src={loadingImg} isStatic />
            </div>
        </div>
    );
}