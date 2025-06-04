import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/redux/shoppingCartSlice";

export function GridProducts() {
  const dispatch = useDispatch();

  const shoppingCart = useSelector((state) => state.shoppingCart);

  const { tableData } = useGetProducts();

  const handleAddProductToCart = (product) => {
    dispatch(addProductToCart(product));
  };

  const validateProduct = (product) => {
    return shoppingCart.products.find((item) => item.id === product.id);
  };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {tableData?.data?.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gray-50 aspect-square">
            <img
              className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              src={`https://cwlruitlkwtajppfrzek.supabase.co/storage/v1/object/public/${product.image}`}
              alt={product.name}
              loading="lazy"
            />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">4.5</span>
              </div>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Brand Badge */}
            <Badge
              variant="secondary"
              className="text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-100"
            >
              {product.brand}
            </Badge>

            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {/* Category */}
            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">
                S/ {Number.parseFloat(product.price).toFixed(2)}
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            {validateProduct(product) ? (
              <div className="flex items-center gap-2 w-full">
                {/* Decrease Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  // onClick={onDecrease}
                  // disabled={disabled || quantity <= 1}
                >
                  <Minus className="h-3 w-3 text-gray-600" />
                </Button>

                {/* Quantity Display */}
                <div className="flex-1 text-center">
                  <div className="bg-gray-50 rounded-md py-1 px-2 border">
                    <span className="text-sm font-medium text-gray-900">
                      {validateProduct(product).quantity}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      en carrito
                    </span>
                  </div>
                </div>

                {/* Increase Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  // onClick={onIncrease}
                  // disabled={disabled}
                >
                  <Plus className="h-3 w-3 text-gray-600" />
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200 group/btn"
                size="sm"
                onClick={() => handleAddProductToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                Agregar al carrito
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
