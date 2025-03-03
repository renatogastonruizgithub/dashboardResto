import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3001/api/v1/table/"

const TABLE="http://localhost:3001/api/v1/order/NotAvailable/"

const COLLECTION="http://localhost:3001/api/v1/order/collections/"

export const fetchTables = createAsyncThunk("tables/fetchTables", async () => {
  const response = await axios.get(API_URL);
  console.log(response.data)
  return response.data; 
});

export const fetchTableOrder = createAsyncThunk("tables/fetchTableOrder", async () => {
  const response = await axios.get(TABLE);
  console.log(response.data)
  return response.data; 
});

export const fetchCollections = createAsyncThunk("tables/fetchCollections", async () => {
  const response = await axios.get(COLLECTION);
  console.log(response.data)
  return response.data; 
});





const tablesSlice = createSlice({
  name: "tables",
  initialState: {
    tables: [],
    collections:[],
    tableOrder:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTableOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.tableOrder = action.payload;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
  },
});

export default tablesSlice.reducer;
