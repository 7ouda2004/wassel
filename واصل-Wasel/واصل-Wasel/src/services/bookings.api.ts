import { apiClient } from './api';

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  age?: number;
  governorate?: string;
  center_id: string;
  specialist_id?: string;
  appointment_date: string;
  appointment_time: string;
  condition_type: string;
  notes?: string;
}

export const bookingsApi = {
  // Create a new booking
  createBooking: async (data: BookingFormData): Promise<{ message: string, booking_id: string }> => {
    return apiClient('/bookings', {
      method: 'POST',
      body: data,
    });
  },

  // Upload file and optionally link to a booking
  uploadFile: async (file: File, bookingId?: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    if (bookingId) {
      formData.append('booking_id', bookingId);
    }

    return apiClient('/uploads', {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  },

  // (Protected) Get bookings for a center
  getCenterBookings: async (centerId: string, filters?: { status?: string, date?: string }): Promise<any[]> => {
    let query = '';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.date) params.append('date', filters.date);
      query = `?${params.toString()}`;
    }
    
    return apiClient(`/bookings/center/${centerId}${query}`, {
      useAuth: true,
    });
  },

  // (Protected) Update booking status
  updateBookingStatus: async (bookingId: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled'): Promise<any> => {
    return apiClient(`/bookings/${bookingId}/status`, {
      method: 'PATCH',
      body: { status },
      useAuth: true,
    });
  }
};
