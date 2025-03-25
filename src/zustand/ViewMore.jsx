import { create } from 'zustand';

const ViewMore = create((set) => ({
  id: null,
  isOpen: false,
  setId: (newId) => set({ id: newId }),
}));

export default ViewMore;
