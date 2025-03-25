import { create } from 'zustand';

const UserCredentials = create((set) => ({
  user: null,
  userDetails: (details) => set({ user: details }),
}));

export default UserCredentials;
