/**
 * Supabase-backed registration requests.
 * Used for specialist & center join requests so that ANY user from ANY device
 * can register and the admin will see them in real-time.
 */

import { supabase } from './supabase';
import { defaultSpecialists, defaultCenters, type Specialist, type Center } from './db';

// ─── Types ──────────────────────────────────────────────────────────────────

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface RegistrationRequest {
  id: string;
  type: 'specialist' | 'center';
  // Common
  full_name: string;
  phone: string;
  username: string;
  password: string;
  // Specialist-specific
  role?: string;
  bio?: string;
  image?: string;
  // Center-specific
  center_name?: string;
  location?: string;
  address?: string;
  working_hours?: string;
  region?: string;
  // Meta
  status: RegistrationStatus;
  submitted_at: string;
  reviewed_at?: string;
}

// ─── Submit a new registration request ──────────────────────────────────────

export async function submitRegistration(
  data: Omit<RegistrationRequest, 'id' | 'submitted_at' | 'reviewed_at'>
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from('registration_requests').insert({
    type: data.type,
    full_name: data.full_name,
    phone: data.phone,
    username: data.username,
    password: data.password,
    role: data.role ?? null,
    bio: data.bio ?? null,
    image: data.image ?? null,
    center_name: data.center_name ?? null,
    location: data.location ?? null,
    address: data.address ?? null,
    working_hours: data.working_hours ?? null,
    region: data.region ?? null,
    status: 'pending',
  });

  if (error) {
    console.error('submitRegistration error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// ─── Fetch pending requests (admin) ─────────────────────────────────────────

export async function getPendingRequests(): Promise<RegistrationRequest[]> {
  const { data, error } = await supabase
    .from('registration_requests')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('getPendingRequests error:', error);
    return [];
  }
  return (data ?? []) as RegistrationRequest[];
}

// ─── Approve a request ───────────────────────────────────────────────────────

export async function approveRequest(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('registration_requests')
    .update({ status: 'approved', reviewed_at: new Date().toISOString() })
    .eq('id', id);

  return !error;
}

// ─── Reject a request ────────────────────────────────────────────────────────

export async function rejectRequest(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('registration_requests')
    .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
    .eq('id', id);

  return !error;
}

// ─── Delete a request permanently ────────────────────────────────────────────

export async function deleteRequest(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('registration_requests')
    .delete()
    .eq('id', id);

  return !error;
}

// ─── Check if username is already taken ──────────────────────────────────────

export async function isUsernameTaken(username: string): Promise<boolean> {
  // Check registration requests
  const { data: regData } = await supabase
    .from('registration_requests')
    .select('id')
    .eq('username', username)
    .limit(1);

  if (regData && regData.length > 0) return true;

  // Check approved specialists
  const { data: specData } = await supabase
    .from('specialists')
    .select('id')
    .eq('username', username)
    .limit(1);

  if (specData && specData.length > 0) return true;

  // Check approved centers
  const { data: centerData } = await supabase
    .from('centers')
    .select('id')
    .eq('username', username)
    .limit(1);

  if (centerData && centerData.length > 0) return true;

  return false;
}

// ─── Sync Supabase DB to LocalStorage ────────────────────────────────────────

export async function syncDatabase() {
  try {
    const { data: dbSpecs } = await supabase.from('specialists').select('*');
    const { data: dbCenters } = await supabase.from('centers').select('*');

    // Load Specialists
    const localSpecsSaved = localStorage.getItem('specialists');
    const localSpecs: Specialist[] = localSpecsSaved ? JSON.parse(localSpecsSaved) : defaultSpecialists;

    const mergedSpecs = [...localSpecs];
    if (dbSpecs && dbSpecs.length > 0) {
      dbSpecs.forEach((dbSpec: any) => {
        const mappedSpec: Specialist = {
          id: dbSpec.id,
          name: dbSpec.full_name,
          username: dbSpec.username,
          password: dbSpec.password,
          role: dbSpec.specialization || 'أخصائي أطراف صناعية وجبائر طبية',
          bio: dbSpec.bio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
          image: dbSpec.image || '/images/new.jpg',
          expertise: dbSpec.expertise || [],
          status: dbSpec.is_active ? 'active' : 'rejected',
          phone: dbSpec.phone
        };
        const idx = mergedSpecs.findIndex(s => s.username === mappedSpec.username || s.id === mappedSpec.id);
        if (idx > -1) {
          mergedSpecs[idx] = { ...mergedSpecs[idx], ...mappedSpec };
        } else {
          mergedSpecs.push(mappedSpec);
        }
      });
    }
    localStorage.setItem('specialists', JSON.stringify(mergedSpecs));

    // Load Centers
    const localCentersSaved = localStorage.getItem('centers');
    const localCenters: Center[] = localCentersSaved ? JSON.parse(localCentersSaved) : defaultCenters;

    const mergedCenters = [...localCenters];
    if (dbCenters && dbCenters.length > 0) {
      dbCenters.forEach((dbCenter: any) => {
        const mappedCenter: Center = {
          id: dbCenter.id,
          name: dbCenter.name_ar,
          location: dbCenter.governorate_ar || dbCenter.location || 'القاهرة',
          address: dbCenter.address_ar || dbCenter.address || '',
          phone: dbCenter.phone,
          workingHours: dbCenter.working_hours_ar || dbCenter.workingHours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
          image: dbCenter.image || '/images/ortho.png',
          region: dbCenter.region_ar || dbCenter.region || 'القاهرة الكبرى',
          description: dbCenter.description || `مركز واصل المعتمد في محافظة ${dbCenter.location || 'القاهرة'}. نوفر أحدث الأطراف والجبائر التقويمية تحت إشراف طبي معتمد وبأعلى كفاءة.`,
          services: dbCenter.services_ar || dbCenter.services || [
            'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
            'جبائر تقويم العظام المخصصة (AFO, KAFO)',
            'تصميم الفرش الطبي والأحذية الطبية المخصصة باستخدام تقنيات قياس الضغط',
            'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
            'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
          ],
          reviews: dbCenter.reviews || [],
          status: dbCenter.is_active ? 'active' : 'rejected'
        };
        const idx = mergedCenters.findIndex(c => c.name === mappedCenter.name || c.id === mappedCenter.id);
        if (idx > -1) {
          mergedCenters[idx] = { ...mergedCenters[idx], ...mappedCenter };
        } else {
          mergedCenters.push(mappedCenter);
        }
      });
    }
    localStorage.setItem('centers', JSON.stringify(mergedCenters));
  } catch (err) {
    console.error('syncDatabase unexpected error:', err);
  }
}

// ─── Approve specialist in database ──────────────────────────────────────────

export async function approveSpecialistInDb(request: RegistrationRequest): Promise<boolean> {
  const { error: insertErr } = await supabase
    .from('specialists')
    .insert({
      full_name: request.full_name,
      phone: request.phone,
      username: request.username,
      password: request.password,
      specialization: request.role || 'أخصائي أطراف صناعية وجبائر طبية',
      image: request.image || null,
      is_active: true
    });

  if (insertErr) {
    console.error('approveSpecialistInDb insert error:', insertErr);
    return false;
  }

  return await approveRequest(request.id);
}

// ─── Approve center in database ──────────────────────────────────────────────

export async function approveCenterInDb(request: RegistrationRequest): Promise<boolean> {
  const { error: insertErr } = await supabase
    .from('centers')
    .insert({
      name_ar: request.center_name || request.full_name,
      phone: request.phone,
      whatsapp: request.phone,
      username: request.username,
      password: request.password,
      address_ar: request.address || null,
      governorate_ar: request.location || null,
      region_ar: request.region || null,
      image: request.image || null,
      working_hours_ar: request.working_hours || null,
      is_active: true
    });

  if (insertErr) {
    console.error('approveCenterInDb insert error:', insertErr);
    return false;
  }

  return await approveRequest(request.id);
}
