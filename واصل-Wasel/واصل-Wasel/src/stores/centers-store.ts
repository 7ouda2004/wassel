import { create } from 'zustand';
import type { Center } from '@/types/database';

interface CentersFilters {
  searchTerm: string;
  city: string;
  region: string;
  insuranceSupported: boolean | null;
  service: string;
}

interface CentersState {
  // State
  centers: Center[];
  selectedCenter: Center | null;
  filters: CentersFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCenters: (centers: Center[]) => void;
  setSelectedCenter: (center: Center | null) => void;
  setFilters: (filters: Partial<CentersFilters>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getFilteredCenters: () => Center[];
}

const defaultFilters: CentersFilters = {
  searchTerm: '',
  city: '',
  region: '',
  insuranceSupported: null,
  service: '',
};

export const useCentersStore = create<CentersState>()((set, get) => ({
  centers: [],
  selectedCenter: null,
  filters: { ...defaultFilters },
  isLoading: false,
  error: null,

  setCenters: (centers) => set({ centers }),

  setSelectedCenter: (selectedCenter) => set({ selectedCenter }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  getFilteredCenters: () => {
    const { centers, filters } = get();
    return centers.filter((center) => {
      // Search filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesSearch =
          center.name_ar.toLowerCase().includes(term) ||
          center.name_en.toLowerCase().includes(term) ||
          center.city_ar.toLowerCase().includes(term) ||
          center.city_en.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      // City filter
      if (filters.city) {
        if (center.city_ar !== filters.city && center.city_en !== filters.city)
          return false;
      }

      // Region filter
      if (filters.region) {
        if (center.region_ar !== filters.region && center.region_en !== filters.region)
          return false;
      }

      // Insurance support filter
      if (filters.insuranceSupported !== null) {
        if (center.insurance_supported !== filters.insuranceSupported)
          return false;
      }

      return true;
    });
  },
}));
