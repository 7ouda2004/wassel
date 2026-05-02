import { supabase } from '@/lib/supabase';
import type { InsuranceRequest, InsuranceRequestStatus } from '@/types/database';

export const insuranceService = {
  /**
   * Create a new insurance request
   */
  async create(request: {
    patient_id: string;
    center_id?: string;
    insurance_provider: string;
    policy_number?: string;
    notes?: string;
    documents?: string[];
  }): Promise<InsuranceRequest> {
    const { data, error } = await supabase
      .from('insurance_requests')
      .insert({
        ...request,
        status: 'pending' as InsuranceRequestStatus,
        documents: request.documents || [],
      })
      .select('*, centers(*), profiles!insurance_requests_patient_id_fkey(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get insurance requests for a patient
   */
  async getByPatient(patientId: string): Promise<InsuranceRequest[]> {
    const { data, error } = await supabase
      .from('insurance_requests')
      .select('*, centers(*)')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get insurance requests for a center
   */
  async getByCenter(centerId: string): Promise<InsuranceRequest[]> {
    const { data, error } = await supabase
      .from('insurance_requests')
      .select('*, profiles!insurance_requests_patient_id_fkey(*)')
      .eq('center_id', centerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Update request status
   */
  async updateStatus(
    id: string,
    status: InsuranceRequestStatus,
    adminNotes?: string
  ): Promise<InsuranceRequest> {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (adminNotes) updateData.admin_notes = adminNotes;

    const { data, error } = await supabase
      .from('insurance_requests')
      .update(updateData)
      .eq('id', id)
      .select('*, centers(*), profiles!insurance_requests_patient_id_fkey(*)')
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Upload insurance document
   */
  async uploadDocument(file: File, requestId: string): Promise<string> {
    const fileName = `insurance/${requestId}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(data.path);

    // Update request documents array
    const { data: request } = await supabase
      .from('insurance_requests')
      .select('documents')
      .eq('id', requestId)
      .single();

    if (request) {
      const docs = [...(request.documents || []), urlData.publicUrl];
      await supabase
        .from('insurance_requests')
        .update({ documents: docs })
        .eq('id', requestId);
    }

    return urlData.publicUrl;
  },

  /**
   * Get all insurance requests (admin)
   */
  async getAll(): Promise<InsuranceRequest[]> {
    const { data, error } = await supabase
      .from('insurance_requests')
      .select('*, centers(*), profiles!insurance_requests_patient_id_fkey(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get available insurance providers
   */
  getInsuranceProviders() {
    return [
      { id: 'metlife', name_ar: 'ميتلايف', name_en: 'MetLife' },
      { id: 'axa', name_ar: 'أكسا', name_en: 'AXA' },
      { id: 'allianz', name_ar: 'أليانز', name_en: 'Allianz' },
      { id: 'bupa', name_ar: 'بوبا', name_en: 'Bupa' },
      { id: 'nile_family', name_ar: 'النيل فاميلي تكافل', name_en: 'Nile Family Takaful' },
      { id: 'misr_insurance', name_ar: 'مصر للتأمين', name_en: 'Misr Insurance' },
      { id: 'gig', name_ar: 'جي آي جي', name_en: 'GIG' },
      { id: 'oriental_weavers', name_ar: 'أورينتال', name_en: 'Oriental' },
      { id: 'qnb_alahli', name_ar: 'QNB الأهلي', name_en: 'QNB Al Ahli' },
      { id: 'other', name_ar: 'أخرى', name_en: 'Other' },
    ];
  },
};
