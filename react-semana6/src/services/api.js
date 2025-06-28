import { makePost } from "@/helpers/fetching";
import { setUser } from "@/redux/authSlice";
import { store } from "@/redux/store";

const BASE_URL = "http://127.0.0.1:5000/api/v1";
import { toast } from "sonner";

export async function registerOrLogin(path, body) {
  try {
    const { isSuccess, data, error } = await makePost(
      `${BASE_URL}/${path}`,
      body
    );

    if (!isSuccess) throw error;

    store.dispatch(
      setUser({ user: data.user.user, access_token: data.user.access_token })
    );

    return true;
  } catch (error) {
    toast.error(`Error: ${error}`);
    return false;
  }
}
