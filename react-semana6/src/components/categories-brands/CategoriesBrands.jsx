import { useState } from "react";
import { Card } from "../ui/card";
import { useGetCategoriesAndBrands } from "@/hooks/useGetCategoriesAndBrands";
import { Badge } from "../ui/badge";

export function CategoriesBrands() {
  const [brandIds, setBrandIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const { data } = useGetCategoriesAndBrands();

  const handleBrandClick = (brand) => {
    // verificamos si el id existe
    if (brandIds.includes(brand.id)) {
      const ids = brandIds.filter((brandId) => brandId != brand.id);
      setBrandIds(ids);
    } else {
      setBrandIds([...brandIds, brand.id]);
    }
  };

  const handleCategoryClick = (category) => {
    if (categoryIds.includes(category.id)) {
      const ids = categoryIds.filter((categoryId) => categoryId != category.id);
      setCategoryIds(ids);
    } else {
      setCategoryIds([...categoryIds, category.id]);
    }
  };
  return (
    <Card className="space-y-10">
      <div>
        <div>
          <h3 className="text-lg font-semibold px-4">Marcas</h3>
          <div className="flex xl:flex-col gap-4 p-4 my-3 overflow-x-auto">
            {data &&
              data.brands?.map((brand) => (
                <Badge
                  key={brand.id}
                  variant={brandIds.includes(brand.id) ? "default" : "outline"}
                  onClick={() => handleBrandClick(brand)}
                  className="px-4 py-2 cursor-pointer"
                >
                  {brand.name}
                </Badge>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold px-4 mt-5">Categorias</h3>
          <div className="flex xl:flex-col gap-4 p-4 my-3 overflow-x-auto">
            {data &&
              data.categories?.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    categoryIds.includes(category.id) ? "default" : "outline"
                  }
                  onClick={() => handleCategoryClick(category)}
                  className="px-4 py-2 cursor-pointer"
                >
                  {category.name}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
