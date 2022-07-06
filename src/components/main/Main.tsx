import { Route, Routes } from "react-router-dom";
import { HomeProvider } from "../../contexts/homeContext";
import { RightSideProvider } from "../../contexts/rightSideContext";

import { LeftSide } from "../asides/leftSide/LeftSide";
import { RightSide } from "../asides/rightSide/RightSide";
import { NotFound } from "../NotFound";
import { Achievements } from "../views/achievements/Achievements";
import { Anime } from "../views/anime/Anime";
import { AnimeEdit } from "../views/anime/anime-edit/AnimeEdit";
import { AnimePage } from "../views/anime/anime-page/AnimePage";
import { AnimeCreate } from "../views/animeCreate/AnimeCreate";
import { CityDefence } from "../views/cityDefence/CityDefence";
import { Galery } from "../views/galery/Galery";
import { GaleryPage } from "../views/galery/GaleryPage";
import { Home } from "../views/home/Home";
import { News } from "../views/news/News";
import { NewsEdit } from "../views/news/NewsEdit";
import { NewsPage } from "../views/news/NewsPage";
import { Profile } from "../views/profile/Profile";
import { Projects } from "../views/projects/Projects";
import { Rules } from "../views/rules/Rules";
import { Source } from "../views/sources/Source";
import { SwordArtOnlineClicker } from "../views/swordArtOnlineClicker/SwordArtOnlineClicker";
import { TypePage } from "../views/types/TypePage";
import { Types } from "../views/types/Types";
import { Users } from "../views/users/Users";
import { WhatsTheMelodyHistory } from "../views/whatsTheMelody/WhatsTheMelodyHistory";
import { Curtain } from "./Curtain";

export const Main = () => {

    return (
        <div className="main">
            <Curtain />
            <LeftSide />
            <HomeProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/anime" element={<Anime />} />
                    <Route path="/anime/:animeId" element={<AnimePage />} />
                    <Route path="/anime/:animeId/edit" element={<AnimeEdit />} />
                    <Route path="/anime-create" element={<AnimeCreate />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:newsId" element={<NewsPage />} />
                    <Route path="/news/:newsId/edit" element={<NewsEdit />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:userId/*" element={<Profile />} />
                    <Route path="/galery" element={<Galery />} />
                    <Route path="/galery/:animeId" element={<GaleryPage />} />
                    <Route path="/types" element={<Types />} />
                    <Route path="/types/:typeId" element={<TypePage />} />
                    <Route path="/source" element={<Source />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<NotFound />} />
                    <Route path="/whats-the-melody" element={<WhatsTheMelodyHistory />} />
                    <Route path="/sword-art-online-clicker" element={<SwordArtOnlineClicker />} />
                    <Route path="/city-defence" element={<CityDefence />} />
                    <Route path="/privacy-policy" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HomeProvider>
            <RightSideProvider>
                <RightSide />
            </RightSideProvider>
        </div>
    );
};