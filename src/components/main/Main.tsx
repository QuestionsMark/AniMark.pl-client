import { Route, Routes } from "react-router-dom";
import { HomeProvider } from "../../contexts/homeContext";
import { RightSideProvider } from "../../contexts/rightSideContext";

import { LeftSide } from "../asides/leftSide/LeftSide";
import { RightSide } from "../asides/rightSide/RightSide";
import { Anime } from "../views/anime/Anime";
import { AnimePage } from "../views/anime/anime-page/AnimePage";
import { AnimeCreate } from "../views/animeCreate/AnimeCreate";
import { Galery } from "../views/galery/Galery";
import { Home } from "../views/home/Home";
import { News } from "../views/news/News";
import { NewsPage } from "../views/news/NewsPage";
import { Profile } from "../views/profile/Profile";
import { Users } from "../views/users/Users";
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
                    <Route path="/galery/:animeId" element={<Home />} />
                    <Route path="/types" element={<Home />} />
                    <Route path="/types/:typeId" element={<Home />} />
                    <Route path="/sources" element={<Home />} />
                    <Route path="/achievements" element={<Home />} />
                    <Route path="/rules" element={<Home />} />
                    <Route path="/projects" element={<Home />} />
                    <Route path="/projects/:projectId" element={<Home />} />
                    <Route path="/whats-the-melody" element={<Home />} />
                    <Route path="/sword-art-online-clicker" element={<Home />} />
                    <Route path="/city-defence" element={<Home />} />
                    <Route path="/privacy-policy" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </HomeProvider>
            <RightSideProvider>
                <RightSide />
            </RightSideProvider>
        </div>
    );
};