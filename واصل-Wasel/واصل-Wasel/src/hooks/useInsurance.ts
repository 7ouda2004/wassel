import { useEffect } from 'react';
import { useInsuranceStore } from '@/stores/insurance-store';
import { insuranceService } from '@/services/insurance.service';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Hook to fetch and manage insurance requests for the current user
 */
export function useInsurance() {
  const store = useInsuranceStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
      store.setLoading(true);
      try {
        const data = await insuranceService.getByPatient(user.id);
        store.setRequests(data);
      } catch (error: any) {
        store.setError(error.message);
      } finally {
        store.setLoading(false);
      }
    };

    fetchRequests();
  }, [user?.id]);

  return {
    requests: store.requests,
    isLoading: store.isLoading,
    error: store.error,
    addRequest: store.addRequest,
    updateStatus: store.updateRequestStatus,
    getByStatus: store.getRequestsByStatus,
    providers: insuranceService.getInsuranceProviders(),
  };
}
