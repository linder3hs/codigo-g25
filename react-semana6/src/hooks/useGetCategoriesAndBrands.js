import { useEffect, useState } from "react";
import { getDataFromTable } from "@/services/supabase";
import { toast } from "sonner";

export function useGetCategoriesAndBrands() {
  const [data, setData] = useState({
    brands: null,
    categories: null,
  });

  const fetchBrandsAndCategories = async () => {
    const categories = await getDataFromTable("categories");
    const brands = await getDataFromTable("brands");

    if (!categories.success) {
      toast.error("Hubo un error al obtener las categorias.");
      return;
    }

    if (!brands.success) {
      toast.error("Hubo un error el obtener las marcas");
      return;
    }

    setData({
      brands: brands.data,
      categories: categories.data,
    });
  };

  useEffect(() => {
    fetchBrandsAndCategories();
  }, []);

  return { data };
}
