import type { StateCreator } from 'zustand';
import type { AppState } from './useAppStore';

export interface FavoritesSlice {
  favoriteIds: string[];
  toggleFavorite: (projectId: string) => void;
}

export const createFavoritesSlice: StateCreator<AppState, [['zustand/persist', unknown]], [], FavoritesSlice> = (set) => ({
  favoriteIds: [],
  toggleFavorite: (projectId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(projectId)
        ? state.favoriteIds.filter((id) => id !== projectId)
        : [...state.favoriteIds, projectId],
    })),
});