import { useEffect, useState } from "react";
import { getDataFromTable } from "@/services/supabase";
import { toast } from "sonner";
import { createColumnHelper } from "@tanstack/react-table";

export function useGetProducts() {
  const [tableData, setTableData] = useState({
    columns: [],
    data: [],
  });

  const generateColumns = () => {
    const columnHelper = createColumnHelper();
    const columns = [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      }),
      columnHelper.accessor("name", {
        header: "Nombre",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: "Descripción",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("brand", {
        header: "Marca",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("category", {
        header: "Categoría",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: "Precio",
        cell: (info) => `S/ ${info.getValue()}`,
      }),
      columnHelper.accessor("image", {
        header: "Imagen",
        cell: (info) => (
          <>
            <img
              className="h-[100px] w-[100px] object-cover"
              src={`https://cwlruitlkwtajppfrzek.supabase.co/storage/v1/object/public/${info.getValue()}`}
            />
          </>
        ),
        enableColumnFilter: false,
      }),
    ];

    return columns;
  };

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

      const columns = generateColumns(result.data);

      const mapProducts = result.data.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          brand: product.brands.name,
          category: product.categories.name,
          price: String(product.price),
          image: product.image,
        };
      });

      setTableData({
        columns: columns,
        data: mapProducts,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    tableData,
    fetchProducts,
  };
}
