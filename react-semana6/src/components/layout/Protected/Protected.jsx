import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { AppSidebar } from "../AppSidebar";

export function Protected() {
  const { access_token, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar con ancho fijo */}
      <div>
        <AppSidebar />
      </div>

      {/* Contenido centrado */}
      <main className="flex-1 flex  bg-gray-50 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
