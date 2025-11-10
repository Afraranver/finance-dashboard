import { create } from 'zustand';
import { UserPreferences } from '@/types';

interface AppState {
  preferences: UserPreferences;
  selectedPeriod: 'week' | 'month' | 'year';
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  setSelectedPeriod: (period: 'week' | 'month' | 'year') => void;
}

export const useStore = create<AppState>((set) => ({
  preferences: {
    currency: 'USD',
    theme: 'light',
    notifications: true,
  },
  selectedPeriod: 'month',
  setPreferences: (newPreferences) =>
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    })),
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
}));