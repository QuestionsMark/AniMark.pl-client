import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePopup } from "../../contexts/popupContext";

interface Props {
    icon: IconDefinition;
    question: string;
    className?: string;
    handler: () => void;
}

export const ConfirmIconButton = ({ handler, icon, question, className }: Props) => {

    const { setConfirmPopup } = usePopup();

    const handleClick = () => {
        setConfirmPopup({ acceptHandler: handler, open: true, question });
    };

    return (
        <FontAwesomeIcon icon={icon} className={`btn-add${className ? ' ' + className : ''}`} onClick={handleClick} />
    );
};