import create from 'zustand';

export const useThemeStore = create((set) => ({
  darkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode', newDarkMode);
      return { darkMode: newDarkMode };
    }),
}));
