import {create} from 'zustand';
import axios from 'axios';
import { toast } from "react-toastify";
const API_URL = "http://localhost:3001/api/v1/order/";

const useOrderStore = create((set) => ({
  orders: [],
  oneOrder: null,
  loading: false,
  kitchen: [],
  customer: [],
  waiter: [],
  pendingCharges: [],
  error: null,
  name: "",
  items: [], // [{ productId, quantity }]

  // Synchronous actions
  agregar: (productId, name) =>
    set((state) => {
      console.log(productId,name+"zuntands")
      const existingProduct = state.items.find((item) => item.productId === productId);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.items.push({ productId, name, quantity: 1 });
      }
      return { items: [...state.items] };
    }),

  restar: (productId) =>
    set((state) => {
      const existingProduct = state.items.find((item) => item.productId === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          state.items = state.items.filter((item) => item.productId !== productId);
        }
      }
      return { items: [...state.items] };
    }),

  clearCart: () => set({ items: [] }),
  setName: (name) => set(() => ({ name })),
  ClearName: () => set(() => ({ name:""})),
  // Asynchronous actions
  fetchOrder: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URL);
      set({ orders: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchKitchen: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}kitchen`);
      set({ kitchen: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCustomer: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}customer`);
      set({ customer: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchWaiter: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}waiter`);
      set({ waiter: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPendingCharges: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}pendingCharges`);
      set({ pendingCharges: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getOneOrder: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}${id}`);
      set({ oneOrder: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  patchOrder: async (id, datosActualizados,messages) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`${API_URL}${id}`, datosActualizados, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ oneOrder: response.data, loading: false });
       toast.success(`${messages}`, { position: "top-right" });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  sendOrder: async (orderData) => {
    set({ loading: true });
    try {
      const response = await axios.post(API_URL, orderData, {
        headers: { "Content-Type": "application/json" },
      });
      set({ items: response.data, loading: false });
   

    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useOrderStore;
