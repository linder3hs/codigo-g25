import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToggle } from "@/hooks/useToggle";
import { useGetCategoriesAndBrands } from "@/hooks/useGetCategoriesAndBrands";
import { useProductForm } from "@/hooks/useProductForm";

export function CreateProduct() {
  const { current, handleToggle } = useToggle(false);

  const { handleInputChange, handleSubmit, values } =
    useProductForm(handleToggle);

  const { data } = useGetCategoriesAndBrands();

  return (
    <>
      <Dialog open={current} onOpenChange={handleToggle}>
        {/* para poder activar el dialog usamos DialogTrigger */}
        <DialogTrigger asChild>
          <Button>Crear Producto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Productos</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
              <div>
                <Input
                  name="name"
                  placeholder="Nombre del producto"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  name="description"
                  placeholder="Descripción del producto"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  name="price"
                  placeholder="Precio"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Select value={values.brand} onValueChange={handleInputChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {data &&
                      data?.brands?.map((brand) => (
                        <SelectItem key={brand.id} value={`brand-${brand.id}`}>
                          {brand.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={values.category}
                  onValueChange={handleInputChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {data &&
                      data?.categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={`category-${category.id}`}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  name="image"
                  placeholder="Imagen"
                  type="file"
                  onChange={handleInputChange}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            </div>
            <div className="mt-5">
              <Button className="w-full">Enviar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
