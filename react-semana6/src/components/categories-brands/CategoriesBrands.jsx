import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCategoriesAndBrands } from "@/hooks/useGetCategoriesAndBrands";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, Tag, Package } from "lucide-react";

export function CategoriesBrands() {
  const [brandIds, setBrandIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const { data } = useGetCategoriesAndBrands();

  const handleBrandClick = (brand) => {
    if (brandIds.includes(brand.id)) {
      const ids = brandIds.filter((brandId) => brandId !== brand.id);
      setBrandIds(ids);
    } else {
      setBrandIds([...brandIds, brand.id]);
    }
  };

  const handleCategoryClick = (category) => {
    if (categoryIds.includes(category.id)) {
      const ids = categoryIds.filter(
        (categoryId) => categoryId !== category.id
      );
      setCategoryIds(ids);
    } else {
      setCategoryIds([...categoryIds, category.id]);
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Filter className="h-5 w-5 text-gray-600" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brands Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Marcas</h3>
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
            {data?.brands?.map((brand) => (
              <Badge
                key={brand.id}
                variant={brandIds.includes(brand.id) ? "default" : "outline"}
                onClick={() => handleBrandClick(brand)}
                className={`
                  px-3 py-1.5 cursor-pointer transition-all duration-200 text-sm font-medium
                  hover:scale-105 hover:shadow-sm whitespace-nowrap
                  ${
                    brandIds.includes(brand.id)
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {brand.name}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Categories Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Categorías</h3>
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
            {data?.categories?.map((category) => (
              <Badge
                key={category.id}
                variant={
                  categoryIds.includes(category.id) ? "default" : "outline"
                }
                onClick={() => handleCategoryClick(category)}
                className={`
                  px-3 py-1.5 cursor-pointer transition-all duration-200 text-sm font-medium
                  hover:scale-105 hover:shadow-sm whitespace-nowrap
                  ${
                    categoryIds.includes(category.id)
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
