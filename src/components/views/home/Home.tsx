import { useEffect, useRef } from "react";
import { useHome } from "../../../contexts/homeContext";
import { getData } from "../../../utils/getData";
import { Loading } from "../../common/Loading";
import { AnimeOnTop } from "./AnimeOnTop";
import { LastNews } from "./LastNews";
import { MyProjects } from "./MyProjects";
import { RecommendedProfiles } from "./RecommendedProfiles";

export const Home = () => {

    const { animeOnTop, lastNews, projects, recommendedProfiles, setAnimeOnTop, setLastNews, setProjects, setRecommendedProfiles } = useHome();

    const componentRef = useRef<HTMLElement>(null);

    const getAnimeOnTop = () => {
        getData('anime-on-top/actual', setAnimeOnTop, componentRef);
    };
    const getLastNews = () => {
        getData('news/last', setLastNews, componentRef);
    };
    const getProjects = () => {
        getData('projects', setProjects, componentRef);
    };
    const getRecommendedProfiles = () => {
        getData('users/recommended', setRecommendedProfiles, componentRef);
    };

    useEffect(() => {
        getAnimeOnTop();
        getLastNews();
        getProjects();
        getRecommendedProfiles();
    }, []);

    return (
        <main ref={componentRef} className="main__content home">
            {animeOnTop && lastNews && recommendedProfiles && projects ?
                <>
                    <LastNews />
                    <AnimeOnTop />
                    <RecommendedProfiles />
                    <MyProjects />
                </> :
                <Loading />}
        </main>
    );
};