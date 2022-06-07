import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../contexts/userContext";

interface Props {
    className?: string;
    icon: IconDefinition;
    isRefresh?: boolean;
    handler: () => void;
}

export const AdminOption = ({ className, icon, isRefresh, handler }: Props) => {

    const { user } = useUser();

    return (
        <>
            {user.rank === 2 ? <div className={`admin-option${className ? ' ' + className : ''}`}>
                <FontAwesomeIcon icon={icon} className={`admin-option__icon${isRefresh ? ' admin-option__icon--refresh' : ''}`} onClick={handler} />
            </div> : null}
        </>
    );
};