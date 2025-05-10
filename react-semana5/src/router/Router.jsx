import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemonName" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
