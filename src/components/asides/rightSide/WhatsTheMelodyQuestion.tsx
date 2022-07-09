import { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { NewVote, WhatsTheMelodyQuestion as WhatsTheMelodyQuestionAPI } from "../../../types";

import { AudioComponent } from "../../common/Audio";
import { ButtonPlus } from "../../common/ButtonPlus";

import { usePopup } from "../../../contexts/popupContext";
import { useRightSide } from "../../../contexts/rightSideContext";
import { useUser } from "../../../contexts/userContext";
import { AdminOption } from "../../common/AdminOption";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useSocket } from "../../../contexts/socketContext";

interface Props {
    handleRollWhatsTheMelody: () => Promise<void>;
}

export const WhatsTheMelodyQuestion = ({ handleRollWhatsTheMelody }: Props) => {

    const { user, token } = useUser();
    const { socket } = useSocket();
    const { whatsTheMelodyQuestion } = useRightSide();
    const { setLoginPopup } = usePopup();
    const { _id, answears, src } = whatsTheMelodyQuestion as WhatsTheMelodyQuestionAPI;

    const [vote, setVote] = useState<string>('');

    const handleVote = async () => {
        if (vote) {
            setVote('');
            if (user.logged) {
                if (!socket) return;
                socket.emit('whats-the-melody__new-vote', { token, wtmId: _id, vote } as NewVote);
            } else {
                setLoginPopup({ message: '', open: true, status: false });
            }
        }
    };

    const answearList = () => {
        return answears.map(a => <FormControlLabel key={a} id="radio" className="recommended-anime__label" value={a} control={<Radio />} label={a} />);
    };

    return (
        <section className="right-side__section recommended-anime whats-the-melody">
            <AdminOption handler={handleRollWhatsTheMelody} icon={faRefresh} className="recommended-anime__admin-option" isRefresh />
            <h3 className="recommended-anime__title">Jaka to melodia?</h3>
            <div className="recommended-anime__audio">
                <AudioComponent id={src} />
            </div>
            <div className="recommended-anime__answears">
                <FormControl component="fieldset">
                    <RadioGroup value={vote} onChange={(e) => setVote(e.target.value)}>
                        {answearList()}
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="recommended-anime__buttons">
                <ButtonPlus disabled={vote ? false : true} handler={handleVote}>Sprawdź</ButtonPlus>
            </div>
        </section>
    );
}