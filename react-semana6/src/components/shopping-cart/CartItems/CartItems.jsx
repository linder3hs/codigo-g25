import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/helpers/format";
import { useToggle } from "@/hooks/useToggle";
import {
  descrementProductQuantity,
  incrementProductQuantity,
} from "@/redux/shoppingCartSlice";
import { Dialog } from "@radix-ui/react-dialog";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";

export function CartItems(props) {
  const { products, setIsCartOpen } = props;

  const { current, handleToggle } = useToggle(false);

  const dispatch = useDispatch();

  return (
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
                        onClick={handleToggle}
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
                        <span className="text-gray-500 ml-1">c/u</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-white"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              dispatch(
                                descrementProductQuantity({
                                  id: item.id,
                                })
                              )
                            }
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
                        <span className="text-sm text-gray-600">Subtotal:</span>
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
      <Dialog open={current} onOpenChange={handleToggle}>
        <DialogContent>
          <p>Eliminar producto del carrito?</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
