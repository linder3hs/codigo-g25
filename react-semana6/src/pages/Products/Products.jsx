import { DataTable } from "@/components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { CreateProduct } from "@/components/product";
import { useGetProducts } from "@/hooks/useGetProducts";

export function Products() {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Precio",
      cell: (info) => `S/ ${info.getValue()}`,
    }),
  ];

  useGetProducts();

  return (
    <section className="space-y-10">
      <div>
        <CreateProduct />
      </div>
      <div>
        <DataTable
          columns={columns}
          data={[
            {
              id: 1,
              name: "iPhone 16",
              price: 1000,
            },
            {
              id: 2,
              name: "iPhone 14",
              price: 1200,
            },
          ]}
        />
      </div>
    </section>
  );
}
