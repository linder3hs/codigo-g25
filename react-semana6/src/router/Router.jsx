import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Products } from "@/pages/Products";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
