import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:3001/api/v1/status/";


const UsestatusStore = create((set) => ({
    status: [],  
    loading: false,
    error: [],
  
    fetchStatus: async () => {
      set({ loading: true });
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        set({ status: Array.isArray(data) ? data : [data] });
      } catch (error) {
        set({ error, loading: false });
      }
    },  

    updateStatus: async (id,statusID) => {
      set({ loading: true });
      try {
        const response = await axios.patch(`${API_URL}${id}`, { statusId: statusID });
       
        set({ status: response.data, loading: false });
      } catch (error) {

        // Captura el mensaje específico del backend
    const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';
    set({ error: errorMessage, loading: false });
        toast.warning(`${errorMessage}`, { position: "top-right" });
      }
    },  
  
  
  }));//fin
  
  export default UsestatusStore;
  