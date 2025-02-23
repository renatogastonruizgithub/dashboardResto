import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3001/api/v1/table/";


export const fetchTables = createAsyncThunk("tables/fetchTables", async () => {
  const response = await axios.get(API_URL);
  console.log(response.data)
  return response.data; 
});





const tablesSlice = createSlice({
  name: "tables",
  initialState: {
    tables: [],
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
      });
  },
});

export default tablesSlice.reducer;
