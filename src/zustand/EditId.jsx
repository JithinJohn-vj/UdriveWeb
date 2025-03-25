import { create } from 'zustand';

const EditId = create((set) => ({
  id: null,
  setId: (newId) => set({ id: newId }),
}));

export default EditId;
