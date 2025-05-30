import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router";

export function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, _setCart] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-gray-900" />
            <h1 className="text-xl font-bold text-gray-900">Mi Tiendita</h1>
          </div>

          {/* Cart Button */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center  text-white"
                >
                  {0}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Carrito de Compras
                </SheetTitle>
              </SheetHeader>

              {/* Cart Items */}
              <div className="flex-1 overflow-hidden mt-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-gray-500 text-sm">
                      No has agregado productos a tu carrito de compras todavía.
                    </p>
                    <Button
                      className="mt-6 bg-gray-900 hover:bg-gray-800"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continuar comprando
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-220px)]">
                    <div className="space-y-4 pr-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          {/* Product Image */}
                          <div className="h-20 w-20 rounded-md border bg-gray-50 flex-shrink-0 overflow-hidden">
                            <img
                              src={`https://cwlruitlkwtajppfrzek.supabase.co/storage/v1/object/public/${item.image}`}
                              alt={item.name}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.brand}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="font-medium">
                                S/ {Number(item.price).toFixed(2)}
                              </p>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-sm w-4 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <SheetFooter className="mt-auto pt-4">
                  <div className="w-full space-y-4">
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold">S/ 100</span>
                    </div>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">
                      Proceder al pago
                    </Button>
                  </div>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
