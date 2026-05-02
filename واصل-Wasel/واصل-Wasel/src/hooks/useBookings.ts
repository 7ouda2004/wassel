import { useEffect } from 'react';
import { useBookingsStore } from '@/stores/bookings-store';
import { bookingsService } from '@/services/bookings.service';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Hook to fetch and manage bookings for the current user
 */
export function useBookings() {
  const store = useBookingsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      store.setLoading(true);
      try {
        const data = await bookingsService.getByUser(user.id);
        store.setBookings(data);
      } catch (error: any) {
        store.setError(error.message);
      } finally {
        store.setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  return {
    bookings: store.bookings,
    isLoading: store.isLoading,
    error: store.error,
    addBooking: store.addBooking,
    updateStatus: store.updateBookingStatus,
    getByStatus: store.getBookingsByStatus,
  };
}
