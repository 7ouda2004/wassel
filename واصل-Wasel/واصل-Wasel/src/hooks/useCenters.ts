import { useEffect } from 'react';
import { useCentersStore } from '@/stores/centers-store';
import { centersService } from '@/services/centers.service';

/**
 * Hook to fetch and manage centers data
 */
export function useCenters() {
  const store = useCentersStore();

  useEffect(() => {
    const fetchCenters = async () => {
      if (store.centers.length > 0) return; // Skip if already loaded
      store.setLoading(true);
      try {
        const data = await centersService.getAll();
        store.setCenters(data);
      } catch (error: any) {
        store.setError(error.message);
      } finally {
        store.setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  return {
    centers: store.centers,
    filteredCenters: store.getFilteredCenters(),
    selectedCenter: store.selectedCenter,
    filters: store.filters,
    isLoading: store.isLoading,
    error: store.error,
    setFilters: store.setFilters,
    resetFilters: store.resetFilters,
    setSelectedCenter: store.setSelectedCenter,
    refresh: async () => {
      store.setLoading(true);
      try {
        const data = await centersService.getAll();
        store.setCenters(data);
      } finally {
        store.setLoading(false);
      }
    },
  };
}
