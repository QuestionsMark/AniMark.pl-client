import { ReactNode } from "react";
import Popup from "reactjs-popup";

import { useUser } from "../../contexts/userContext";

interface Props {
    form: ReactNode;
    trigger: ReactNode;
    close: () => void;
    isOpen: boolean;
}

export const FormPopup = ({ form, isOpen, trigger, close }: Props) => {

    const { user } = useUser();

    return (
        <>
            {user && [1, 2].includes(user.rank) &&
                <>
                    {trigger}
                    <Popup
                        modal
                        nested
                        closeOnDocumentClick={false}
                        open={isOpen}
                        onClose={close}
                    >
                        {form}
                    </Popup>
                </>}
        </>
    );
};