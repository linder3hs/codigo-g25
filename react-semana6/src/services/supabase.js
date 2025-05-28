import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Subir archivos
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

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getDataFromTable(table, select = "*") {
  try {
    const { data, error } = await supabase.from(table).select(select);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

// Crear registros en la db
export async function storeInTable(table, body) {
  try {
    const { data, error } = await supabase.from(table).insert(body).select();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
