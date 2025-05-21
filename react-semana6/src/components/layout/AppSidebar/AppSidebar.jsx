import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Package, User, LogOut } from "lucide-react"; // íconos de lucide
import { logoutUser } from "@/redux/authSlice";
import { toast } from "sonner";

export function AppSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = dispatch(logoutUser());

    if (!response.success) {
      toast.error(response.error.message);
      return;
    }

    navigate("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r shadow-sm">
        <SidebarHeader className="px-4 py-6 text-lg font-bold text-center">
          Mi Tiendita
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground text-xs px-3 mb-2">
              Navegación
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              <SidebarMenuButton asChild>
                <Link
                  to="/products"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span>Productos</span>
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Mi Perfil</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </button>
              </SidebarMenuButton>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="text-xs text-muted-foreground text-center p-4">
          © {new Date().getFullYear()} Mi Tiendita
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
