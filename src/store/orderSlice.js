import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3001/api/v1/order/";


export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const response = await axios.get(API_URL);

  return response.data; 
})

export const fetchKitchen = createAsyncThunk("order/fetchKitchen", async () => {
  const response = await axios.get("http://localhost:3001/api/v1/order/kitchen");

  return response.data; 
})
export const fetchCustomer = createAsyncThunk("order/fetchCustomer", async () => {
  const response = await axios.get("http://localhost:3001/api/v1/order/customer");

  return response.data; 
})


export const fetchWaiter = createAsyncThunk("order/fetchWaiter", async () => {
  const response = await axios.get("http://localhost:3001/api/v1/order/waiter");

  return response.data; 
})



export const getOneOrder = createAsyncThunk("order/getOneOrder", async (id) => {
  try {
    console.log("en store id"+ id);
    const response = await axios.get(API_URL+id); 
    console.log("en store"+response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }})

  export const patchOrder = createAsyncThunk(
    "order/patchOrder",
    async ({ id, datosActualizados }, { rejectWithValue }) => {
      try {
        console.log("Enviando actualización para el ID:", id);
        const response = await axios.patch(`${API_URL}${id}`, datosActualizados, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Respuesta del servidor:", response.data);

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  export const sendOrder = createAsyncThunk("order/sendOrder", async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, orderData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al enviar el pedido")
    }
  });

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    oneOrder:null,
    loading: false,
    kitchen:[],
    customer:[],
    waiter:[],
    error: null,    
    items: [], // [{ productId, quantity }]
  },
  reducers: {
    agregar: (state, action) => {
      const { productId } = action.payload;
      
      const existingProduct = state.items.find((item) => item.productId === productId);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.items.push({ productId, quantity: 1 });
      }
    },
    restar: (state, action) => {
      const { productId } = action.payload;
      const existingProduct = state.items.find((item) => item.productId === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          state.items = state.items.filter((item) => item.productId !== productId);
        }
      }
    },
   /*  setTable: (state, action) => {
      state.table = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    }, */
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET ONE ORDER
      .addCase(getOneOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.oneOrder=action.payload;
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Actualiza la orden en el estado
      .addCase(patchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchOrder.fulfilled, (state, action) => {
        state.loading = false;      
      })
      .addCase(patchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.loading = false;
        state.items =action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchKitchen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKitchen.fulfilled, (state,action) => {
        state.loading = false;
        state.kitchen = action.payload
      })
      .addCase(fetchKitchen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  

      .addCase(fetchCustomer.fulfilled, (state,action) => {
        state.loading = false;
        state.customer = action.payload
      })
      .addCase(fetchWaiter.fulfilled, (state,action) => {
        state.loading = false;
        state.waiter = action.payload
      })
  },
});
export const { agregar, restar, clearCart } = orderSlice.actions;
export default orderSlice.reducer;
