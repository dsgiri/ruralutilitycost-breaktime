/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Games } from "./pages/Games";
import { Favorites } from "./pages/Favorites";
import { QuickPlay } from "./pages/QuickPlay";
import { SharedPage } from "./pages/SharedPage";
import { GamePlayer } from "./pages/GamePlayer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<Games />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="quick-play" element={<QuickPlay />} />
          <Route path="games/:gameId" element={<GamePlayer />} />
          
          {/* Shared ecosystem pages matched by path parameter */}
          <Route path=":pageName" element={<SharedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

