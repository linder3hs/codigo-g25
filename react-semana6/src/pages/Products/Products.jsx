import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(values);
  };

  return (
    <section>
      <div>
        <div>
          <Dialog>
            {/* para poder activar el dialog usamos DialogTrigger */}
            <DialogTrigger asChild>
              <Button>Crear Producto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Productos</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5 mt-4">
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
