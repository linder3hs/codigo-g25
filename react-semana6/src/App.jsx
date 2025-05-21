import { useEffect } from "react";
import { Router } from "./router";
import { useDispatch } from "react-redux";
import { getSession } from "./redux/authSlice";
import { Toaster } from "@/components/ui/sonner";

function App() {
  // todas la funcion que se ejecuten fuera de un slice requieren un dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return (
    <>
      <Router />
      <Toaster richColors />
    </>
  );
}

export default App;
