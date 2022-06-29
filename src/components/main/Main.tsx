import { Route, Routes } from "react-router-dom";
import { HomeProvider } from "../../contexts/homeContext";
import { RightSideProvider } from "../../contexts/rightSideContext";

import { LeftSide } from "../asides/leftSide/LeftSide";
import { RightSide } from "../asides/rightSide/RightSide";
import { NotFound } from "../NotFound";
import { Anime } from "../views/anime/Anime";
import { AnimePage } from "../views/anime/anime-page/AnimePage";
import { AnimeCreate } from "../views/animeCreate/AnimeCreate";
import { CityDefence } from "../views/cityDefence/CityDefence";
import { Galery } from "../views/galery/Galery";
import { GaleryPage } from "../views/galery/GaleryPage";
import { Home } from "../views/home/Home";
import { News } from "../views/news/News";
import { NewsPage } from "../views/news/NewsPage";
import { Profile } from "../views/profile/Profile";
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
                    <Route path="/anime-create" element={<AnimeCreate />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:newsId" element={<NewsPage />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:userId/*" element={<Profile />} />
                    <Route path="/galery" element={<Galery />} />
                    <Route path="/galery/:animeId" element={<GaleryPage />} />
                    <Route path="/types" element={<Types />} />
                    <Route path="/types/:typeId" element={<TypePage />} />
                    <Route path="/sources" element={<Home />} />
                    <Route path="/achievements" element={<Home />} />
                    <Route path="/rules" element={<Home />} />
                    <Route path="/projects" element={<Home />} />
                    <Route path="/projects/:projectId" element={<Home />} />
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