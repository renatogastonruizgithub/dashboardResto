import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // Objeto donde las claves son los IDs de los productos y los valores son sus cantidades
  },
  reducers: {
    agregar: (state, action) => {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    restar: (state, action) => {
      const { id } = action.payload;
      if (state.items[id] && state.items[id] > 1) {
        state.items[id]--;
      } else {
        delete state.items[id]; // Si la cantidad es 1 y se resta, eliminamos el producto del carrito
      }
    },
  },
});

export const { agregar, restar } = cartSlice.actions;
export default cartSlice.reducer;
