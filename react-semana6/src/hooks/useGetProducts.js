import { useEffect } from "react";
import { getDataFromTable } from "@/services/supabase";
import { toast } from "sonner";

export function useGetProducts() {
  const fetchProducts = async () => {
    try {
      const result = await getDataFromTable(
        "products",
        `id,
        name,
        image,
        price,
        description,
        brands (name),
        categories (name)
        `
      );

      if (!result.success) {
        throw result.error;
      }

      console.log(result.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
}
