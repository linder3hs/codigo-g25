import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function Protected() {
  const { user } = useSelector((state) => state.auth); // {user: null, loading: false, error}
  console.log("protected", { user });

  if (!user) {
    // si user no existe vamos a redirigir al usuario al login
    return <Navigate to="/login" replace />;
  }
  // el componente permitido
  return <Outlet />;
}
