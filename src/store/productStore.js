import {create} from 'zustand';
import axios from 'axios';


const API_URL = "http://localhost:3001/api/v1/category/";

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,


  fetchCategori: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      set({ categories: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Función para obtener productos por categoría ID
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log("id Zustand: " + id);
      const response = await axios.get(`${API_URL}${id}`);
      console.log(response.data);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
