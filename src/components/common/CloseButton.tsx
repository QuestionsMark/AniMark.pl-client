import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    className?: string;
    handler: () => void;
}

export const CloseButton = ({ className, handler }: Props) => {
    return (
        <FontAwesomeIcon icon={faXmark} className={`btn-close${className ? ' ' + className : ''}`} onClick={handler} />
    );
};