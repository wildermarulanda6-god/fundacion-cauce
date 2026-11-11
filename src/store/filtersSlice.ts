import type { StateCreator } from 'zustand';
import type { StatusFilter } from '@/types';
import type { AppState } from './useAppStore';

export interface FiltersSlice {
  query: string;
  status: StatusFilter;
  setQuery: (query: string) => void;
  setStatus: (status: StatusFilter) => void;
  resetFilters: () => void;
}

export const createFiltersSlice: StateCreator<AppState, [['zustand/persist', unknown]], [], FiltersSlice> = (set) => ({
  query: '',
  status: 'all',
  setQuery: (query) => set({ query }),
  setStatus: (status) => set({ status }),
  resetFilters: () => set({ query: '', status: 'all' }),
});