import { DataTable } from "@/components/table";
import { CreateProduct } from "@/components/product";
import { useGetProducts } from "@/hooks/useGetProducts";

export function Products() {
  const { tableData, fetchProducts } = useGetProducts();

  return (
    <section className="space-y-10">
      <div>
        <CreateProduct fetchProducts={fetchProducts} />
      </div>
      <div>
        <DataTable columns={tableData.columns} data={tableData.data} />
      </div>
    </section>
  );
}
