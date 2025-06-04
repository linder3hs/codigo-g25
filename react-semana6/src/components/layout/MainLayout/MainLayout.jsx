import { ShoppingCartDrawer } from "@/components/shopping-cart";
import { Store } from "lucide-react";
import { Link, Outlet } from "react-router";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Mi Tiendita
              </h1>
            </div>
          </Link>
          <ShoppingCartDrawer />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
