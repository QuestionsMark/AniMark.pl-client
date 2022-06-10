import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { AnimeOnTopPopulateAPI, NewsCondensedAPI, ProjectAPI, RecommendedProfileAPI } from "../types";

interface HomeContextValue {
    animeOnTop: AnimeOnTopPopulateAPI | null;
    lastNews: NewsCondensedAPI[] | null;
    projects: ProjectAPI[] | null;
    recommendedProfiles: RecommendedProfileAPI[] | null;
    setAnimeOnTop: Dispatch<SetStateAction<AnimeOnTopPopulateAPI | null>>;
    setLastNews: Dispatch<SetStateAction<NewsCondensedAPI[] | null>>;
    setProjects: Dispatch<SetStateAction<ProjectAPI[] | null>>;
    setRecommendedProfiles: Dispatch<SetStateAction<RecommendedProfileAPI[] | null>>;
}

const HomeContext = createContext<HomeContextValue>(null!);

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }: { children: ReactNode; }) => {

    const [animeOnTop, setAnimeOnTop] = useState<AnimeOnTopPopulateAPI | null>(null);
    const [lastNews, setLastNews] = useState<NewsCondensedAPI[] | null>(null);
    const [projects, setProjects] = useState<ProjectAPI[] | null>(null);
    const [recommendedProfiles, setRecommendedProfiles] = useState<RecommendedProfileAPI[] | null>(null);

    return (
        <HomeContext.Provider value={{ animeOnTop, lastNews, projects, recommendedProfiles, setAnimeOnTop, setLastNews, setProjects, setRecommendedProfiles }} >
            {children}
        </HomeContext.Provider>
    );
} 