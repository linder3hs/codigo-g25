import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export function CartTrigger(props) {
  const { products } = props;

  return (
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
  );
}
