import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { AppSidebar } from "../AppSidebar";

export function Protected() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar con ancho fijo */}
      <div className="w-64 border-r">
        <AppSidebar />
      </div>

      {/* Contenido centrado */}
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
