import { useEffect, useRef } from "react";
import { useRightSide } from "../../../contexts/rightSideContext";
import { useSocket } from "../../../contexts/socketContext";
import { useUser } from "../../../contexts/userContext";
import { useChecked } from "../../../hooks/useChecked";
import { useHiddenAudio } from "../../../hooks/useHiddenAudio";
import { didUserVote } from "../../../utils/checkFunctions";
import { getData } from "../../../utils/getData";
import { HiddenAudio } from "../../common/HiddenAudio";
import { Loading } from "../../common/Loading";
import { RecommendedAnime } from "./RecommendedAnime";
import { WhatsTheMelody } from "./WhatsTheMelody";
import { WhatsTheMelodyComments } from "./WhatsTheMelodyComments";

import plum from "../../../audio/plum.mp3";

export const RightSide = () => {

    const componentRef = useRef<HTMLElement>(null);
    const { user } = useUser();
    const { socket } = useSocket();
    const { recommendedAnime, whatsTheMelodyQuestion, whatsTheMelodyResults, setComments, setRecommendedAnime, setWhatsTheMelodyQuestion, setWhatsTheMelodyResults } = useRightSide();

    const { isChecked, result } = useChecked(
        () => didUserVote(whatsTheMelodyQuestion ? whatsTheMelodyQuestion.votes : null, user.userId),
        [user, whatsTheMelodyQuestion, whatsTheMelodyResults],
        [user, whatsTheMelodyQuestion],
        true
    );

    const { audioRef, setSource } = useHiddenAudio(0.5);

    const getWhatsTheMelodyQuestion = () => {
        getData('whats-the-melody/actual', setWhatsTheMelodyQuestion, componentRef);
    };
    const getWhatsTheMelodyResults = () => {
        getData('whats-the-melody/actual/results', setWhatsTheMelodyResults, componentRef);
    };
    const getWhatsTheMelodyComments = (limit: number = 10) => {
        getData(`whats-the-melody/actual/comments?limit=${limit}`, setComments, componentRef);
        // Powiadomienie o nowych wiadomościach i mozliwosć zescrollowania na sam dół
    };

    useEffect(() => {
        getData('anime/recommended', setRecommendedAnime, componentRef);
        getWhatsTheMelodyQuestion();
    }, []);

    // Pobranie zagadki muzycznej po zresetowaniu "Jaka to melodia?" i zresetowanie wyników oraz komentarzy
    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody__roll', () => {
            setSource(plum);
            getWhatsTheMelodyQuestion();
            setWhatsTheMelodyResults(null);
            setComments(null);
        });
        return () => { socket.off('whats-the-melody__roll') };
    }, [socket]);

    // Pobieranie wyników po oddaniu głosu przez kogoś
    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody__new-vote', () => {
            getWhatsTheMelodyResults();
        });
        return () => { socket.off('whats-the-melody__new-vote') };
    }, [socket]);

    // Pobranie wyników i pobranie komentarzy po wysłaniu głosu.
    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody__your-new-vote', () => {
            getWhatsTheMelodyQuestion();
            getWhatsTheMelodyResults();
            getWhatsTheMelodyComments();
        });
        return () => { socket.off('whats-the-melody__your-new-vote') };
    }, [socket]);

    // Pobranie komentarzy po pojawieniu się nowego komentarza
    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody__new-comment', () => {
            setSource(plum);
            getWhatsTheMelodyComments();
        });
        return () => { socket.off('whats-the-melody__new-comment') };
    }, [socket]);


    // Pobranie komentarzy po pojawieniu się nowego komentarza
    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody__your-new-comment', () => {
            getWhatsTheMelodyComments();
        });
        return () => { socket.off('whats-the-melody__your-new-comment') };
    }, [socket]);

    // Pobranie komentarzy po aktualizacji komentarzy
    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody__comments-refresh', () => {
            getWhatsTheMelodyComments();
        });
        return () => { socket.off('whats-the-melody__comments-refresh') };
    }, [socket]);

    return (
        <aside ref={componentRef} className="main__right-side right-side">
            <HiddenAudio audioRef={audioRef} src={plum} autoplay isStatic />
            {recommendedAnime && whatsTheMelodyQuestion ?
                <>
                    <RecommendedAnime />
                    <WhatsTheMelody isChecked={isChecked} result={result} />
                    {user.logged && isChecked && result && <WhatsTheMelodyComments />}
                </> :
                <Loading />
            }
        </aside>
    );
};