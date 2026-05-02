import { supabase } from '@/lib/supabase';
import type { Booking, BookingStatus } from '@/types/database';

export const bookingsService = {
  /**
   * Create a new booking
   */
  async create(booking: {
    user_id: string;
    center_id: string;
    booking_date: string;
    booking_time?: string;
    appointment_type?: string;
    service_type?: string;
    notes?: string;
    patient_name?: string;
    patient_phone?: string;
    patient_email?: string;
  }): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...booking,
        status: 'pending' as BookingStatus,
      })
      .select('*, centers(*), profiles(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get bookings for a specific user
   */
  async getByUser(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, centers(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get bookings for a specific center
   */
  async getByCenter(centerId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, profiles(*)')
      .eq('center_id', centerId)
      .order('booking_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Update booking status
   */
  async updateStatus(id: string, status: BookingStatus, notes?: string): Promise<Booking> {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (notes) updateData.notes = notes;

    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .select('*, centers(*), profiles(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cancel a booking
   */
  async cancel(id: string): Promise<Booking> {
    return this.updateStatus(id, 'cancelled');
  },

  /**
   * Get a specific booking by ID
   */
  async getById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, centers(*), profiles(*)')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  /**
   * Get all bookings (admin)
   */
  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, centers(*), profiles(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get pending bookings count for a center
   */
  async getPendingCount(centerId: string): Promise<number> {
    const { count, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('center_id', centerId)
      .eq('status', 'pending');

    if (error) throw error;
    return count || 0;
  },
};
