import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Login, Products, SignUp } from "@/pages";
import { Protected } from "@/components/layout/Protected";
import { MainLayout } from "@/components/layout/MainLayout/MainLayout";

export function Router() {
  return (
    <BrowserRouter>
      {/* rutas publicas */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* rutas privadas */}
        <Route element={<Protected />}>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
