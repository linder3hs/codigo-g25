import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function AuthLayout() {
  const { access_token, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (access_token) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
