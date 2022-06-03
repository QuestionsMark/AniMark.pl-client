import { Route, Routes } from "react-router-dom";

import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { Home } from "../views/home/Home";
import { Curtain } from "./Curtain";

export const Main = () => {
    return (
        <div className="main">
            <Curtain />
            <LeftSide />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime" element={<Home />} />
                <Route path="/anime/:id" element={<Home />} />
                <Route path="/anime-create" element={<Home />} />
                <Route path="/news" element={<Home />} />
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
            <RightSide />
        </div>
    );
};