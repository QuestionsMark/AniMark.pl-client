import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { CommentPopulate, RecommendedAnime, WhatsTheMelodyQuestion, WhatsTheMelodyResults } from "../types";

interface RightSideContextValue {
    recommendedAnime: RecommendedAnime | null;
    whatsTheMelodyQuestion: WhatsTheMelodyQuestion | null;
    whatsTheMelodyResults: WhatsTheMelodyResults | null;
    comments: CommentPopulate[] | null;
    setRecommendedAnime: Dispatch<SetStateAction<RecommendedAnime | null>>;
    setWhatsTheMelodyQuestion: Dispatch<SetStateAction<WhatsTheMelodyQuestion | null>>;
    setWhatsTheMelodyResults: Dispatch<SetStateAction<WhatsTheMelodyResults | null>>;
    setComments: Dispatch<SetStateAction<CommentPopulate[] | null>>;
}

const RightSideContext = createContext<RightSideContextValue>(null!);

export const useRightSide = () => useContext(RightSideContext);

export const RightSideProvider = ({ children }: { children: ReactNode }) => {

    const [comments, setComments] = useState<CommentPopulate[] | null>(null);
    const [recommendedAnime, setRecommendedAnime] = useState<RecommendedAnime | null>(null);
    const [whatsTheMelodyQuestion, setWhatsTheMelodyQuestion] = useState<WhatsTheMelodyQuestion | null>(null);
    const [whatsTheMelodyResults, setWhatsTheMelodyResults] = useState<WhatsTheMelodyResults | null>(null);

    return (
        <RightSideContext.Provider value={{
            comments,
            recommendedAnime,
            whatsTheMelodyQuestion,
            whatsTheMelodyResults,
            setComments,
            setRecommendedAnime,
            setWhatsTheMelodyQuestion,
            setWhatsTheMelodyResults
        }}>
            {children}
        </RightSideContext.Provider>
    );
}