import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function Protected() {
  const { user, loading } = useSelector((state) => state.auth); // {user: null, loading: false, error}
  console.log("protected", { user });

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    // si user no existe vamos a redirigir al usuario al login
    return <Navigate to="/login" replace />;
  }
  // el componente permitido
  return <Outlet />;
}
