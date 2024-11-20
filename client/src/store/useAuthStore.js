import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import users from '../data/users.json'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,

      login: async (email, password) => {
        try {
          const user = users.users.find(u => u.email === email);

          if (!user || user.password !== password) {
            set({ error: 'Invalid email or password' });
            throw new Error('Invalid email or password');
          }

          const { password: _, ...userWithoutPassword } = user;
          
          set({
            user: userWithoutPassword,
            token: 'mock-token',
            isAuthenticated: true,
            error: null
          });
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      logout: () => {
        set(initialState);
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
    }
  )
);
