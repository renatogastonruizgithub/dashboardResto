import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3001/api/v1/category/";

// tengo q traer poroductos por la categoria id
export const fetchProduct = createAsyncThunk("product/fetchProduct", async () => {
  const response = await axios.get(API_URL);
  console.log(response.data)
  return response.data; 
});
export const fetchCategori = createAsyncThunk("product/fetchCategori", async (id) => {
  console.log("id redux"+id)
  const response = await axios.get(API_URL+id);
  console.log(response.data)
  return response.data; 
});







const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategori.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
  },
});

export default productSlice.reducer;