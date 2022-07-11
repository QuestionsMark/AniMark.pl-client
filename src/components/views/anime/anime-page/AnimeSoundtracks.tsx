import { Dispatch, SetStateAction } from "react";
import { Soundtrack } from "../../../../types";
import { AnimeSoundtrackElement } from "./AnimeSoundtrackElement";

interface Props {
    soundtracks: Soundtrack[];
    setRefresh: Dispatch<SetStateAction<boolean | null>>;
}

export const AnimeSoundtracks = ({ soundtracks, setRefresh }: Props) => {

    const soundtracksList = () => {
        return soundtracks.map(s => <AnimeSoundtrackElement key={s.id} soundtrack={s} setRefresh={setRefresh} />);
    };

    return (
        <div className="main__subsection anime-page__soundtracks">
            <h3 className="anime-page__subtitle anime-page__soundtracks-title">Do posłuchania</h3>
            <ul className="anime-page__soundtracks-list">
                {soundtracksList()}
            </ul>
        </div>
    );
};