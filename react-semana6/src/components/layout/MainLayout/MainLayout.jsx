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
import { Link, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementProductQuantity } from "@/redux/shoppingCartSlice";

export function MainLayout() {
  const { products } = useSelector((state) => state.shoppingCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();

  const subtotal = products.reduce(
    (prev, curr) => prev + Number(curr.price) * Number(curr.quantity),
    0
  );

  const tax = subtotal * 0.18; // 18% IGV
  const total = subtotal + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
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

          {/* Cart Button */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {products.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs font-medium"
                  >
                    {products.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
              <SheetHeader className="px-6 py-4 border-b">
                <SheetTitle className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="h-5 w-5" />
                  Carrito de Compras
                </SheetTitle>
              </SheetHeader>

              {/* Cart Items */}
              <div className="flex-1 overflow-hidden">
                {products.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                      <ShoppingCart className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-gray-500 text-sm mb-8 max-w-sm">
                      No has agregado productos a tu carrito de compras todavía.
                    </p>
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 px-6"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continuar comprando
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-6 p-6">
                      {products.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg p-4 shadow-sm border"
                        >
                          <div className="flex gap-4">
                            {/* Product Image */}
                            <div className="h-20 w-20 rounded-lg border bg-gray-50 flex-shrink-0 overflow-hidden">
                              <img
                                src={`https://cwlruitlkwtajppfrzek.supabase.co/storage/v1/object/public/${item.image}`}
                                alt={item.name}
                                className="h-full w-full object-contain p-2"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.brand}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              {/* Price and Quantity Row */}
                              <div className="flex items-center justify-between">
                                <div className="text-sm">
                                  <span className="font-semibold text-gray-900">
                                    {formatPrice(item.price)}
                                  </span>
                                  <span className="text-gray-500 ml-1">
                                    c/u
                                  </span>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 hover:bg-white"
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm font-medium w-6 text-center">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 hover:bg-white"
                                      onClick={() =>
                                        dispatch(
                                          incrementProductQuantity({
                                            id: item.id,
                                          })
                                        )
                                      }
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Subtotal */}
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">
                                    Subtotal:
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {formatPrice(
                                      Number(item.price) * Number(item.quantity)
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              {/* Cart Footer */}
              {products.length > 0 && (
                <SheetFooter className="mt-auto border-t bg-white">
                  <div className="w-full p-6 space-y-4">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Subtotal ({products.length}{" "}
                          {products.length === 1 ? "producto" : "productos"})
                        </span>
                        <span className="font-medium">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">IGV (18%)</span>
                        <span className="font-medium">{formatPrice(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-xl text-gray-900">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link
                      to={"/summary"}
                      className="w-full block"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 h-12 text-base font-medium">
                        Proceder al pago
                      </Button>
                    </Link>
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
