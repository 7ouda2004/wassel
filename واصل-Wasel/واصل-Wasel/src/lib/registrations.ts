/**
 * Cloud Registration API Client
 * 
 * Calls our own Vercel serverless API at /api/registrations
 * which proxies to the cloud storage. This avoids all CORS issues
 * because the browser only talks to the same origin (wassel-phi.vercel.app).
 */

import { defaultSpecialists, defaultCenters, type Specialist, type Center } from './db';

// Use relative path on production, fallback to Vercel URL on localhost to enable CORS-enabled database writes
const API_BASE = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'https://wassel-phi.vercel.app/api/registrations'
  : '/api/registrations';

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

    // 1. Overwrite Specialists
    if (db.specialists && Array.isArray(db.specialists)) {
      const mappedSpecs = db.specialists.map((dbSpec: any) => ({
        id: dbSpec.id || dbSpec.username,
        name: dbSpec.name || dbSpec.full_name,
        username: dbSpec.username,
        password: dbSpec.password,
        role: dbSpec.role || dbSpec.specialization || 'أخصائي أطراف صناعية وجبائر طبية',
        bio: dbSpec.bio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
        image: dbSpec.image || '/images/new.jpg',
        expertise: dbSpec.expertise || [],
        status: dbSpec.status || 'active',
        phone: dbSpec.phone,
        centerId: dbSpec.centerId || dbSpec.center_id,
        centerName: dbSpec.centerName || dbSpec.center_name,
        facebook: dbSpec.facebook,
        instagram: dbSpec.instagram,
        linkedin: dbSpec.linkedin
      }));
      localStorage.setItem('specialists', JSON.stringify(mappedSpecs));
    }

    // 2. Overwrite Centers
    if (db.centers && Array.isArray(db.centers)) {
      const mappedCenters = db.centers.map((dbCenter: any) => ({
        id: dbCenter.id || dbCenter.name,
        name: dbCenter.name,
        location: dbCenter.location || 'القاهرة',
        address: dbCenter.address || '',
        phone: dbCenter.phone,
        workingHours: dbCenter.workingHours || dbCenter.working_hours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
        image: dbCenter.image || '/images/ortho.png',
        images: dbCenter.images || [],
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
      }));
      localStorage.setItem('centers', JSON.stringify(mappedCenters));
    }
  } catch (err) {
    console.error('syncDatabase error:', err);
  }
}

// ─── Upload Local Database to Cloud ──────────────────────────────────────────

export async function uploadLocalData(specialists: Specialist[], centers: Center[]): Promise<boolean> {
  try {
    // 1. Get full db to preserve registration requests
    const dbRes = await fetch(`${API_BASE}?action=db`);
    if (!dbRes.ok) return false;
    const db = await dbRes.json();

    // 2. Overwrite specialists and centers with the latest local data
    db.specialists = specialists;
    db.centers = centers;

    // 3. Save back to cloud via the update_db action
    const saveRes = await fetch(`${API_BASE}?action=update_db`, {
      method: 'POST',
      body: JSON.stringify({ db }),
      headers: { 'Content-Type': 'application/json' }
    });

    return saveRes.ok;
  } catch (err) {
    console.error('uploadLocalData error:', err);
    return false;
  }
}

