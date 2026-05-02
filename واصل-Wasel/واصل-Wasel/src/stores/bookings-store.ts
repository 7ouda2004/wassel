import { create } from 'zustand';
import type { Booking, BookingStatus } from '@/types/database';

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;

  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getBookingsByStatus: (status: BookingStatus) => Booking[];
}

export const useBookingsStore = create<BookingsState>()((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,

  setBookings: (bookings) => set({ bookings }),

  addBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),

  updateBookingStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status, updated_at: new Date().toISOString() } : b
      ),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  getBookingsByStatus: (status) => {
    const { bookings } = get();
    return bookings.filter((b) => b.status === status);
  },
}));
