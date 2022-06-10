import { useSocket } from "../../../contexts/socketContext";
import { useUser } from "../../../contexts/userContext";
import { WhatsTheMelodyQuestion } from "./WhatsTheMelodyQuestion";
import { WhatsTheMelodyResults } from "./WhatsTheMelodyResults";

interface Props {
    isChecked: boolean;
    result: boolean;
}

export const WhatsTheMelody = ({ isChecked, result }: Props) => {

    const { user, token } = useUser();
    const { socket } = useSocket();

    const handleRollWhatsTheMelody = async () => {
        if (!socket) return;
        socket.emit('whats-the-melody__set-new', { token });
    };

    return (
        <>
            {isChecked && result && user.logged ?
                <WhatsTheMelodyResults handleRollWhatsTheMelody={handleRollWhatsTheMelody} /> :
                <WhatsTheMelodyQuestion handleRollWhatsTheMelody={handleRollWhatsTheMelody} />}
        </>
    );
};