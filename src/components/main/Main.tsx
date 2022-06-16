import { Route, Routes } from "react-router-dom";
import { HomeProvider } from "../../contexts/homeContext";
import { RightSideProvider } from "../../contexts/rightSideContext";

import { LeftSide } from "../asides/leftSide/LeftSide";
import { RightSide } from "../asides/rightSide/RightSide";
import { Anime } from "../views/anime/Anime";
import { Home } from "../views/home/Home";
import { News } from "../views/news/News";
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
                    <Route path="/anime/:id" element={<Home />} />
                    <Route path="/anime-create" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<Home />} />
                    <Route path="/users" element={<Home />} />
                    <Route path="/users/:id" element={<Home />} />
                    <Route path="/galery" element={<Home />} />
                    <Route path="/galery/:id" element={<Home />} />
                    <Route path="/types" element={<Home />} />
                    <Route path="/types/:id" element={<Home />} />
                    <Route path="/sources" element={<Home />} />
                    <Route path="/achievements" element={<Home />} />
                    <Route path="/rules" element={<Home />} />
                    <Route path="/projects" element={<Home />} />
                    <Route path="/projects/:id" element={<Home />} />
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