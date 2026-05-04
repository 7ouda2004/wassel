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
    // Import from the shared database
    return [
      { id: 'hio', name_ar: 'الهيئة العامة للتأمين الصحي', name_en: 'Health Insurance Organization (HIO)' },
      { id: 'uhis', name_ar: 'التأمين الصحي الشامل', name_en: 'Universal Health Insurance System' },
      { id: 'nfq', name_ar: 'العلاج على نفقة الدولة', name_en: 'State-Funded Treatment' },
      { id: 'bupa', name_ar: 'بوبا مصر', name_en: 'Bupa Egypt' },
      { id: 'allianz', name_ar: 'أليانز مصر', name_en: 'Allianz Egypt' },
      { id: 'metlife', name_ar: 'ميتلايف مصر', name_en: 'MetLife Egypt' },
      { id: 'misr_insurance', name_ar: 'شركة مصر للتأمين', name_en: 'Misr Insurance Company' },
      { id: 'gig', name_ar: 'جي آي جي', name_en: 'GIG Egypt' },
      { id: 'eng_syndicate', name_ar: 'نقابة المهندسين المصرية', name_en: 'Egyptian Engineers Syndicate' },
      { id: 'doctors_syndicate', name_ar: 'نقابة الأطباء', name_en: 'Doctors Syndicate' },
      { id: 'lawyers_syndicate', name_ar: 'نقابة المحامين', name_en: 'Lawyers Syndicate' },
      { id: 'other', name_ar: 'أخرى', name_en: 'Other' },
    ];
  },
};
