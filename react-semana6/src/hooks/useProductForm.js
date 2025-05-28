import { useState } from "react";
import { uploadFile, storeInTable } from "@/services/supabase";
import { toast } from "sonner";

export function useProductForm(handleToggle, fetchProducts) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    image: null,
  });

  const handleInputChange = (event) => {
    let value = "";
    let name = "";

    if (typeof event === "string") {
      name = event.split("-")[0];
      value = event;
    } else {
      name = event.target?.name;
      value = name === "image" ? event.target.files[0] : event.target.value;
    }

    setValues({
      ...values,
      [name]: value,
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
    values.category_id = Number(values.category.split("-")[1]);
    values.brand_id = Number(values.brand.split("-")[1]);

    delete values.category;
    delete values.brand;
    const result = await storeInTable("products", values);

    if (!result.success) {
      toast.error(result.error.message);
      return;
    }
    // cierra el modal
    handleToggle();
    // traer el nuevo producto creado
    fetchProducts();
    toast.success("Se creo el producto correctamente.");
  };

  return {
    values,
    handleInputChange,
    handleSubmit,
  };
}
