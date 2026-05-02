import { create } from 'zustand';
import type { InsuranceRequest, InsuranceRequestStatus } from '@/types/database';

interface InsuranceState {
  requests: InsuranceRequest[];
  isLoading: boolean;
  error: string | null;

  setRequests: (requests: InsuranceRequest[]) => void;
  addRequest: (request: InsuranceRequest) => void;
  updateRequestStatus: (id: string, status: InsuranceRequestStatus, adminNotes?: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getRequestsByStatus: (status: InsuranceRequestStatus) => InsuranceRequest[];
}

export const useInsuranceStore = create<InsuranceState>()((set, get) => ({
  requests: [],
  isLoading: false,
  error: null,

  setRequests: (requests) => set({ requests }),

  addRequest: (request) =>
    set((state) => ({ requests: [request, ...state.requests] })),

  updateRequestStatus: (id, status, adminNotes) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id
          ? { ...r, status, admin_notes: adminNotes || r.admin_notes, updated_at: new Date().toISOString() }
          : r
      ),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  getRequestsByStatus: (status) => {
    const { requests } = get();
    return requests.filter((r) => r.status === status);
  },
}));
