import { create } from 'zustand';

export const useNavStore = create((set) => ({
  selectedNav: 'Personal Details',
  setSelectedNav: (nav) => set({ selectedNav: nav }),
})); 