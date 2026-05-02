import { supabase } from '@/lib/supabase';
import type { Center } from '@/types/database';

export const centersService = {
  /**
   * Get all active centers
   */
  async getAll(): Promise<Center[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('*')
      .eq('is_active', true)
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get a single center by ID
   */
  async getById(id: string): Promise<Center | null> {
    const { data, error } = await supabase
      .from('centers')
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
   * Get centers filtered by city
   */
  async getByCity(city: string): Promise<Center[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('*')
      .eq('is_active', true)
      .or(`city_ar.eq.${city},city_en.eq.${city}`)
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get centers filtered by region
   */
  async getByRegion(region: string): Promise<Center[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('*')
      .eq('is_active', true)
      .or(`region_ar.eq.${region},region_en.eq.${region}`)
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get centers that support insurance
   */
  async getInsuranceSupported(): Promise<Center[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('*')
      .eq('is_active', true)
      .eq('insurance_supported', true)
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Search centers by name or city
   */
  async search(searchTerm: string): Promise<Center[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('*')
      .eq('is_active', true)
      .or(
        `name_ar.ilike.%${searchTerm}%,name_en.ilike.%${searchTerm}%,city_ar.ilike.%${searchTerm}%,city_en.ilike.%${searchTerm}%`
      )
      .order('name_ar');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get all unique cities
   */
  async getCities(): Promise<{ ar: string; en: string }[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('city_ar, city_en')
      .eq('is_active', true);

    if (error) throw error;

    // Deduplicate
    const seen = new Set<string>();
    return (data || []).filter((c) => {
      const key = c.city_ar;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(c => ({ ar: c.city_ar, en: c.city_en }));
  },

  /**
   * Get all unique regions
   */
  async getRegions(): Promise<{ ar: string; en: string }[]> {
    const { data, error } = await supabase
      .from('centers')
      .select('region_ar, region_en')
      .eq('is_active', true);

    if (error) throw error;

    const seen = new Set<string>();
    return (data || [])
      .filter((c) => c.region_ar)
      .filter((c) => {
        const key = c.region_ar!;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(c => ({ ar: c.region_ar!, en: c.region_en || '' }));
  },

  /**
   * Get devices available at a center
   */
  async getCenterDevices(centerId: string) {
    const { data, error } = await supabase
      .from('center_devices')
      .select('*, devices(*)')
      .eq('center_id', centerId)
      .eq('available', true);

    if (error) throw error;
    return data || [];
  },
};
