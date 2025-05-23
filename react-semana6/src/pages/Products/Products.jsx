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
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Input placeholder="Nombre del producto" />
                </div>
                <div>
                  <Input placeholder="Descripción del producto" />
                </div>
                <div>
                  <Input placeholder="Precio" type="number" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
