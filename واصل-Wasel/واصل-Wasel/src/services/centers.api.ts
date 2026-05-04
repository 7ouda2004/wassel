import { apiClient } from './api';
import { GovernorateCenter, Specialist } from '@/data/centers-database';

// Note: For now we map backend response to existing interface to avoid breaking UI components
// Long-term, interfaces should match DB exactly

export const centersApi = {
  // Get all active centers with optional filtering
  getAllCenters: async (filters?: { governorate?: string; region?: string }): Promise<any[]> => {
    let query = '';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.governorate) params.append('governorate', filters.governorate);
      if (filters.region) params.append('region', filters.region);
      query = `?${params.toString()}`;
    }
    
    return apiClient(`/centers${query}`);
  },

  // Get a specific center by ID
  getCenterById: async (id: string): Promise<any> => {
    return apiClient(`/centers/${id}`);
  },

  // Get specialists for a specific center
  getCenterSpecialists: async (centerId: string): Promise<any[]> => {
    return apiClient(`/centers/${centerId}/specialists`);
  }
};
