import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

// slice siempre require un estado inicial
// user => object, loading => bool, error => objecto
const initialState = {
  user: null,
  access_token: null,
  loading: false,
  error: null,
};

/**
 * createSlice({
 *  name: "Es un tipo de identificador unico, es decir ningun otro slice puede usar el mismo nombre",
 *  initialState: "Este recibo el objeto con la información inicial a guardar"
 *  reducers: "Es un conjunto de funciones que van a permitir cambiar el valor del estado inicial"
 * })
 */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // state: Es el estado actual, por defecto vale lo mismo que initialState
    // action: Es un objeto donde vamos a econtrar la data que el usuario envia
    setUser: (state, action) => {
      // {user: {}, access_token: ""}
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.error = null;
      state.loading = false;
    },
    // setLoading: (state) => {
    //   state.loading = false;
    //   state.error = null;
    // },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.access_token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setError, clearUser } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    dispatch(setUser(data.user));

    return { success: true, data };
  } catch (error) {
    dispatch(setError(error));
    return { success: false, error };
  }
};

export const signUpWithEmail =
  (email, password, metadata) => async (dispatch) => {
    // dispatch(setLoading(true));

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      dispatch(setUser(data.user));
      return { success: true, data };
    } catch (error) {
      dispatch(setError(error));
      return { success: false, error };
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(clearUser());
    return { success: true };
  } catch (error) {
    dispatch(setError(error));
    return { success: false, error };
  }
};

export default authSlice.reducer;
