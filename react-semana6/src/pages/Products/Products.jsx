import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { uploadFile, storeInTable } from "@/services/supabase";
import { toast } from "sonner";

export function Products() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    image: null,
  });

  const handleInputChange = (event) => {
    // ... -> spread operator (crea una copia del objeto)
    // event.target.name -> obtiene el valor del atributo name
    // event.target.value -> obtiene el valor que el usuario esta escribiendo
    const name = event.target.name;
    setValues({
      ...values,
      [name]: name === "image" ? event.target.files[0] : event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // primero va a subir la imagen
    const response = await uploadFile(values.image);

    if (!response.success) {
      toast.error(response.error.message);
      return;
    }
    // el values tiene image como un File
    // vamos a reemplazar el valor de values.image por el full path
    values.image = response.data.fullPath;
    const result = await storeInTable("products", values);

    console.log(result);

    if (!result.success) {
      toast.error(result.error.message);
      return;
    }
  };

  return (
    <section>
      <div>
        <div>
          <Dialog open={open}>
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
                    <Input
                      name="brand"
                      placeholder="Marca"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Input
                      name="category"
                      placeholder="Categoria"
                      onChange={handleInputChange}
                    />
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
        </div>
      </div>
    </section>
  );
}
