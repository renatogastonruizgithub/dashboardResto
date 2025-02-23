import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3001/api/v1/order/";


export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const response = await axios.get(API_URL);

  return response.data; 
});

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
  


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    oneOrder:null,
    loading: false,
    error: null,
  },
  reducers: {
    


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
      });

  },
});

export default orderSlice.reducer;
