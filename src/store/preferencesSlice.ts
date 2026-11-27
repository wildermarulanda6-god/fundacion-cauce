import type { StateCreator } from 'zustand';
import type { AppState } from './useAppStore';

export interface PreferencesSlice {
  showImages: boolean;
  setShowImages: (value: boolean) => void;
}

export const createPreferencesSlice: StateCreator<AppState, [['zustand/persist', unknown]], [], PreferencesSlice> = (
  set,
) => ({
  showImages: true,
  setShowImages: (showImages) => set({ showImages }),
});