import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice de ejemplo para mostrar el patrón de Redux Toolkit
 * Este archivo muestra cómo crear un slice con estado y reducers
 */
const ejemploSlice = createSlice({
  name: "ejemplo",
  initialState: {
    contador: 0,
    items: [],
    loading: false,
  },
  reducers: {
    incrementar: (state) => {
      state.contador += 1;
    },
    decrementar: (state) => {
      state.contador -= 1;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  incrementar,
  decrementar,
  setItems,
  setLoading,
} = ejemploSlice.actions;

export default ejemploSlice.reducer;
