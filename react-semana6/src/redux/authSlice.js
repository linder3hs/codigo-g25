import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";

// slice siempre require un estado inicial
// user => object, loading => bool, error => objecto
const initialState = {
  user: null,
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
      state.user = action.payload;
      // just in case, limpiamos el error
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;
