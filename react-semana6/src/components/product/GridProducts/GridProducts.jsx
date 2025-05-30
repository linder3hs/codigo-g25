import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetProducts } from "@/hooks/useGetProducts";

export function GridProducts() {
  const { tableData } = useGetProducts();

  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tableData &&
        tableData.data.map((product) => (
          <Card>
            <img
              className="h-[300px] object-contain"
              src={`https://cwlruitlkwtajppfrzek.supabase.co/storage/v1/object/public/${product.image}`}
            />
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-500 text-sm">{product.brand}</p>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p className="text-xl font-bold">S/ {product.price}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer">Agregar</Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
