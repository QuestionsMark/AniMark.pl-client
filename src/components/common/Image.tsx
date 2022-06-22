import { HOST_ADDRESS } from "../../config";

interface Props {
    alt: string;
    src: string;
    className?: string;
    isStatic?: boolean;
}

export const Image = ({ alt, src, className, isStatic }: Props) => <img src={isStatic ? src : `${HOST_ADDRESS}/media/${src}`} alt={alt} className={`img${className ? ' ' + className : ''}`} />;