import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// en supabase por defecto solo necesita el email, password
// si queremos insertar información extra del usuario se llama metada
export async function signUpWithEmail(email, password, metadata) {
  try {
    // la respuesta que nos da supabase es un objeto que contiene lo siguoente
    /**
     {
      data: {},
      error: {}
     }
     */
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    console.log({ data, error });
  } catch (error) {
    console.log(error);
  }
}
