import { CategoriesBrands } from "@/components/categories-brands";
import { GridProducts } from "@/components/product/GridProducts";

export function Home() {
  return (
    <section className="m-6 space-y-10 flex flex-col lg:flex-row gap-10">
      {/* filtros, marcas, etc */}
      <div className="w-full lg:max-w-sm xl:w-[200px]">
        <CategoriesBrands />
      </div>
      {/* productos */}
      <div className="flex-1">
        <GridProducts />
      </div>
    </section>
  );
}
