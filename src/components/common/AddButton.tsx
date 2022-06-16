import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    className?: string;
    handler: () => void;
}

export const AddButton = ({ className, handler }: Props) => {
    return <FontAwesomeIcon icon={faPlus} className={`btn-add${className ? ' ' + className : ''}`} onClick={handler} />;
};