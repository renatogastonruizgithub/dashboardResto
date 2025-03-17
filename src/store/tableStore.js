import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/table/";
const TABLE = "http://localhost:3001/api/v1/order/NotAvailable/";
const COLLECTION = "http://localhost:3001/api/v1/order/collections/";

const useTableStore = create((set) => ({
  tables: [],
  collections: [],
  tableOrder: [],
  loading: false,
  error: null,

  fetchTables: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      set({ tables: response.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchTableOrder: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(TABLE);
      console.log(response.data);
      set({ tableOrder: response.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchCollections: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(COLLECTION);
      console.log(response.data);
      set({ collections: response.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useTableStore;
