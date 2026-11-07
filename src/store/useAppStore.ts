import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createFavoritesSlice } from './favoritesSlice';
import type { FavoritesSlice } from './favoritesSlice';
import { createFiltersSlice } from './filtersSlice';
import type { FiltersSlice } from './filtersSlice';

export type AppState = FiltersSlice & FavoritesSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createFiltersSlice(...args),
      ...createFavoritesSlice(...args),
    }),
    {
      name: 'cauce-app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    },
  ),
);