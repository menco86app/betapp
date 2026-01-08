// src/store/schedinaStore.js
import { create } from "zustand";

const STORAGE_KEY = "app_schedina";

export const useSchedinaStore = create((set) => ({
  schedina: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
  stake: 10,

  setStake: (value) => set({ stake: value }),

  addBet: (bet) =>
    set((state) => {
      const nuova = [...state.schedina, bet];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuova));
      return { schedina: nuova };
    }),

  removeBet: (id) =>
    set((state) => {
      const nuova = state.schedina.filter(b => b.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuova));
      return { schedina: nuova };
    }),

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ schedina: [] });
  }
}));
