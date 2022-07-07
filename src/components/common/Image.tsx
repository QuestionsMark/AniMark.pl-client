import { HOST_ADDRESS } from "../../config";

interface Props {
    alt: string;
    src: string;
    className?: string;
    icon?: boolean;
    isStatic?: boolean;
}

export const Image = ({ alt, src, className, icon, isStatic }: Props) => {
    return (
        <img
            src={isStatic ? src : `${HOST_ADDRESS}/${icon ? 'icons' : 'media'}/${src}`}
            alt={alt}
            className={`img${className ? ' ' + className : ''}`}
        />
    )
};