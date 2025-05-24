import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { supabase } from "./services/supabase";
import App from "./App.jsx";
import { setUser } from "./redux/authSlice";

// listener
supabase.auth.onAuthStateChange((event, session) => {
  store.dispatch(setUser(session?.user || null));
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
