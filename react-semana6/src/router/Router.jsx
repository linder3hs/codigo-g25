import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Login, Products, SignUp, Summary } from "@/pages";
import { Protected } from "@/components/layout/Protected";
import { MainLayout } from "@/components/layout/MainLayout/MainLayout";

export function Router() {
  return (
    <BrowserRouter>
      {/* rutas publicas */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
        </Route>

        {/* rutas privadas */}
        <Route element={<Protected />}>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
