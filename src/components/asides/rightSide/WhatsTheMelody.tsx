import { usePopup } from "../../../contexts/popupContext";
import { useUser } from "../../../contexts/userContext";
import { fetchTool } from "../../../utils/fetchHelper";
import { WhatsTheMelodyQuestion } from "./WhatsTheMelodyQuestion";
import { WhatsTheMelodyResults } from "./WhatsTheMelodyResults";

interface Props {
    isChecked: boolean;
    result: boolean;
}

export const WhatsTheMelody = ({ isChecked, result }: Props) => {

    const { user } = useUser();
    const { setResponsePopup } = usePopup();

    const handleRollWhatsTheMelody = async () => {
        const response = await fetchTool('whats-the-melody', 'POST');
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        // socket.emit('whats-the-melody-roll');
    };

    return (
        <>
            {isChecked && result && user.logged ?
                <WhatsTheMelodyResults handleRollWhatsTheMelody={handleRollWhatsTheMelody} /> :
                <WhatsTheMelodyQuestion handleRollWhatsTheMelody={handleRollWhatsTheMelody} />}
        </>
    );
};