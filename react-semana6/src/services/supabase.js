import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function uploadFile(file, bucket = "products") {
  try {
    // nombre del archivo unico
    const fileName = `${Date.now()}-${file.name}`;
    // la funcion de supabase que sube el archivo local al storage remoto
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error);
  }
}
