import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    className?: string;
    handler: () => void;
}

export const DeleteButton = ({ className, handler }: Props) => {
    return <FontAwesomeIcon icon={faMinus} className={`btn-add${className ? ' ' + className : ''}`} onClick={handler} />;
};