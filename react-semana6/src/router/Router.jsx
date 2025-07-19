import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Login, Products, SignUp, Summary, PaymentStatus } from "@/pages";
import { Protected } from "@/components/layout/Protected";
import { MainLayout } from "@/components/layout/MainLayout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";

export function Router() {
  return (
    <BrowserRouter>
      {/* rutas publicas */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/payment/:status" element={<PaymentStatus />} />
        </Route>

        {/* rutas privadas */}
        <Route element={<Protected />}>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
