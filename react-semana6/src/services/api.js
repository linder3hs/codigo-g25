import { setUser } from "@/redux/authSlice";
import { store } from "@/redux/store";

const BASE_URL = "http://127.0.0.1:5000/api/v1";
import { toast } from "sonner";
/**
 *
 {
  email: 'linder@gmail.com',
  password: '12321321'
 }
 */
export async function register(body) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (!response.ok) {
      throw "Error en autenticación";
    }

    const data = await response.json();
    console.log({ data });

    // guardamos la informacion en redux
    store.dispatch(
      setUser({
        user: data.user.user,
        access_token: data.user.access_token,
      })
    );
    return true;
  } catch (error) {
    toast.error(`Error: ${error}`);
    return false;
  }
}
