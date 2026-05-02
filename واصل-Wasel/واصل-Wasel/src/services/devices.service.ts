import { supabase } from '@/lib/supabase';
import type { Device, DeviceType } from '@/types/database';

export const devicesService = {
  /**
   * Get all active devices
   */
  async getAll(): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('is_active', true)
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get devices by type
   */
  async getByType(type: DeviceType): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('is_active', true)
      .eq('type', type)
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get a single device by ID
   */
  async getById(id: string): Promise<Device | null> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  /**
   * Search devices
   */
  async search(searchTerm: string): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('is_active', true)
      .or(
        `name_ar.ilike.%${searchTerm}%,name_en.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
      )
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get recommended devices based on quiz answers
   */
  async getRecommendations(criteria: {
    condition?: string;
    activityLevel?: string;
    budgetMin?: number;
    budgetMax?: number;
    type?: DeviceType;
  }): Promise<Device[]> {
    let query = supabase
      .from('devices')
      .select('*')
      .eq('is_active', true);

    if (criteria.type) {
      query = query.eq('type', criteria.type);
    }

    if (criteria.budgetMax) {
      query = query.lte('price_range_min', criteria.budgetMax);
    }

    if (criteria.budgetMin) {
      query = query.gte('price_range_max', criteria.budgetMin);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get centers that have a specific device
   */
  async getDeviceCenters(deviceId: string) {
    const { data, error } = await supabase
      .from('center_devices')
      .select('*, centers(*)')
      .eq('device_id', deviceId)
      .eq('available', true);

    if (error) throw error;
    return data || [];
  },
};
