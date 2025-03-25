import { create } from 'zustand';

// Define your store
const useInvoiceItems = create((set) => ({
  items: [{ name: '', amount: '' }],
  setItems: (newItems) => set({ items: newItems }),
}));

export default useInvoiceItems;
