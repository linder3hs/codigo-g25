import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { CartTrigger } from "../CartTrigger";
import { CartItems } from "../CartItems";
import { formatPrice } from "@/helpers/format";

export function ShoppingCartDrawer() {
  const { products } = useSelector((state) => state.shoppingCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subtotal = products.reduce(
    (prev, curr) => prev + Number(curr.price) * Number(curr.quantity),
    0
  );

  const tax = subtotal * 0.18; // 18% IGV
  const total = subtotal + tax;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <CartTrigger products={products} />
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <CartItems products={products} setIsCartOpen={setIsCartOpen} />

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
                  <span className="font-medium">{formatPrice(subtotal)}</span>
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
  );
}
