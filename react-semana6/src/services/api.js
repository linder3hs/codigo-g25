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
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
}
