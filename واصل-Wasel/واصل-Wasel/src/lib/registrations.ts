/**
 * Cloud Registration API Client
 * 
 * Calls our own Vercel serverless API at /api/registrations
 * which proxies to the cloud storage. This avoids all CORS issues
 * because the browser only talks to the same origin (wassel-phi.vercel.app).
 */

import { defaultSpecialists, defaultCenters, type Specialist, type Center } from './db';

// Use relative path so it works on both localhost and Vercel
const API_BASE = '/api/registrations';

// ─── Types ──────────────────────────────────────────────────────────────────

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface RegistrationRequest {
  id: string;
  type: 'specialist' | 'center';
  full_name: string;
  phone: string;
  username: string;
  password: string;
  role?: string;
  bio?: string;
  image?: string;
  center_name?: string;
  location?: string;
  address?: string;
  working_hours?: string;
  region?: string;
  status: RegistrationStatus;
  submitted_at: string;
  reviewed_at?: string;
}

// ─── Submit a new registration request ──────────────────────────────────────

export async function submitRegistration(
  data: Omit<RegistrationRequest, 'id' | 'submitted_at' | 'reviewed_at'>
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}?action=submit`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'خطأ غير معروف' }));
      return { ok: false, error: err.error || 'فشل في الإرسال' };
    }

    const result = await res.json();
    return result.ok ? { ok: true } : { ok: false, error: result.error || 'فشل في الحفظ' };
  } catch (err: any) {
    console.error('submitRegistration error:', err);
    return { ok: false, error: 'تعذر الاتصال بالسيرفر. تحقق من اتصال الإنترنت.' };
  }
}

// ─── Fetch pending requests (admin) ─────────────────────────────────────────

export async function getPendingRequests(): Promise<RegistrationRequest[]> {
  try {
    const res = await fetch(`${API_BASE}?action=pending`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('getPendingRequests error:', err);
    return [];
  }
}

// ─── Approve a specialist request ────────────────────────────────────────────

export async function approveSpecialistInDb(request: RegistrationRequest): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}?action=approve`, {
      method: 'POST',
      body: JSON.stringify({ id: request.id, type: 'specialist' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error('approveSpecialistInDb error:', err);
    return false;
  }
}

// ─── Approve a center request ────────────────────────────────────────────────

export async function approveCenterInDb(request: RegistrationRequest): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}?action=approve`, {
      method: 'POST',
      body: JSON.stringify({ id: request.id, type: 'center' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error('approveCenterInDb error:', err);
    return false;
  }
}

// ─── Reject a request ────────────────────────────────────────────────────────

export async function rejectRequest(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}?action=reject`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error('rejectRequest error:', err);
    return false;
  }
}

// ─── Check if username is already taken ──────────────────────────────────────

export async function isUsernameTaken(username: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}?action=check_username`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.taken === true;
  } catch (err) {
    console.error('isUsernameTaken error:', err);
    return false;
  }
}

// ─── Sync Cloud DB to LocalStorage ──────────────────────────────────────────

export async function syncDatabase() {
  try {
    const res = await fetch(`${API_BASE}?action=db`);
    if (!res.ok) return;
    const db = await res.json();

    // 1. Load & Sync Specialists
    const localSpecsSaved = localStorage.getItem('specialists');
    const localSpecs: Specialist[] = localSpecsSaved ? JSON.parse(localSpecsSaved) : defaultSpecialists;

    const mergedSpecs = [...localSpecs];
    (db.specialists || []).forEach((dbSpec: any) => {
      const mappedSpec: Specialist = {
        id: dbSpec.id || dbSpec.username,
        name: dbSpec.name || dbSpec.full_name,
        username: dbSpec.username,
        password: dbSpec.password,
        role: dbSpec.role || dbSpec.specialization || 'أخصائي أطراف صناعية وجبائر طبية',
        bio: dbSpec.bio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
        image: dbSpec.image || '/images/new.jpg',
        expertise: dbSpec.expertise || [],
        status: dbSpec.status || 'active',
        phone: dbSpec.phone
      };

      const idx = mergedSpecs.findIndex(s => s.username === mappedSpec.username);
      if (idx > -1) {
        mergedSpecs[idx] = { ...mergedSpecs[idx], ...mappedSpec };
      } else {
        mergedSpecs.push(mappedSpec);
      }
    });
    localStorage.setItem('specialists', JSON.stringify(mergedSpecs));

    // 2. Load & Sync Centers
    const localCentersSaved = localStorage.getItem('centers');
    const localCenters: Center[] = localCentersSaved ? JSON.parse(localCentersSaved) : defaultCenters;

    const mergedCenters = [...localCenters];
    (db.centers || []).forEach((dbCenter: any) => {
      const mappedCenter: Center = {
        id: dbCenter.id || dbCenter.name,
        name: dbCenter.name,
        location: dbCenter.location || 'القاهرة',
        address: dbCenter.address || '',
        phone: dbCenter.phone,
        workingHours: dbCenter.workingHours || dbCenter.working_hours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
        image: dbCenter.image || '/images/ortho.png',
        region: dbCenter.region || 'القاهرة الكبرى',
        description: dbCenter.description || `مركز واصل المعتمد في محافظة ${dbCenter.location || 'القاهرة'}.`,
        services: dbCenter.services || [
          'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
          'جبائر تقويم العظام المخصصة (AFO, KAFO)',
          'تصميم الفرش الطبي والأحذية الطبية المخصصة',
          'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
          'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
        ],
        reviews: dbCenter.reviews || [],
        status: dbCenter.status || 'active'
      };

      const idx = mergedCenters.findIndex(c => c.name === mappedCenter.name);
      if (idx > -1) {
        mergedCenters[idx] = { ...mergedCenters[idx], ...mappedCenter };
      } else {
        mergedCenters.push(mappedCenter);
      }
    });
    localStorage.setItem('centers', JSON.stringify(mergedCenters));
  } catch (err) {
    console.error('syncDatabase error:', err);
  }
}
