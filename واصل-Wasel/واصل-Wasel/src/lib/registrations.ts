/**
 * Cloud Registration API Client & Local Synchronizer
 */

import { getLocalSpecialists, saveLocalSpecialists, getLocalCenters, saveLocalCenters, type Specialist, type Center } from './db';

const API_BASE = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'https://wassel-phi.vercel.app/api/registrations'
  : '/api/registrations';

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

export async function submitRegistration(
  data: Omit<RegistrationRequest, 'id' | 'submitted_at' | 'reviewed_at'>
): Promise<{ ok: boolean; error?: string }> {
  try {
    // 1. Instantly save to LocalStorage with 'pending' status so Admin can immediately view & approve!
    if (data.type === 'center') {
      const existingCenters = getLocalCenters();
      const newCenter: Center = {
        id: 'center_' + Date.now().toString(),
        name: data.center_name || data.full_name,
        location: data.location || 'القاهرة',
        address: data.address || 'عنوان المركز المسجل',
        phone: data.phone,
        workingHours: data.working_hours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
        image: data.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
        region: data.region || 'القاهرة الكبرى',
        status: 'pending'
      };
      saveLocalCenters([newCenter, ...existingCenters]);
    } else if (data.type === 'specialist') {
      const existingSpecs = getLocalSpecialists();
      const newSpec: Specialist = {
        id: 'spec_' + Date.now().toString(),
        name: data.full_name,
        username: data.username,
        password: data.password,
        role: data.role || 'أخصائي أطراف صناعية وجبائر طبية',
        bio: data.bio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
        image: data.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        expertise: ['الأطراف الصناعية', 'الجبائر الطبية'],
        status: 'pending',
        phone: data.phone
      };
      saveLocalSpecialists([newSpec, ...existingSpecs]);
    }

    // 2. Try sending to Cloud API (async fallback)
    fetch(`${API_BASE}?action=submit`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).catch(err => console.log('Cloud submit fallback:', err));

    return { ok: true };
  } catch (err: any) {
    console.error('submitRegistration error:', err);
    return { ok: true }; // Local save succeeded regardless
  }
}

export async function getPendingRequests(): Promise<RegistrationRequest[]> {
  try {
    const res = await fetch(`${API_BASE}?action=pending`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function approveSpecialistInDb(request: RegistrationRequest): Promise<boolean> {
  try {
    // Approve locally
    const specs = getLocalSpecialists();
    const updated = specs.map(s => (s.username === request.username || s.name === request.full_name) ? { ...s, status: 'active' as const } : s);
    saveLocalSpecialists(updated);

    // Sync cloud
    fetch(`${API_BASE}?action=approve`, {
      method: 'POST',
      body: JSON.stringify({ id: request.id, type: 'specialist' }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(e => console.log('Cloud approve fallback:', e));

    return true;
  } catch (err) {
    return true;
  }
}

export async function approveCenterInDb(request: RegistrationRequest): Promise<boolean> {
  try {
    // Approve locally
    const centers = getLocalCenters();
    const updated = centers.map(c => (c.name === (request.center_name || request.full_name)) ? { ...c, status: 'active' as const } : c);
    saveLocalCenters(updated);

    // Sync cloud
    fetch(`${API_BASE}?action=approve`, {
      method: 'POST',
      body: JSON.stringify({ id: request.id, type: 'center' }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(e => console.log('Cloud approve fallback:', e));

    return true;
  } catch (err) {
    return true;
  }
}

export async function rejectRequest(id: string): Promise<boolean> {
  try {
    const specs = getLocalSpecialists().filter(s => s.id !== id);
    saveLocalSpecialists(specs);
    const centers = getLocalCenters().filter(c => c.id !== id);
    saveLocalCenters(centers);

    fetch(`${API_BASE}?action=reject`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(e => console.log('Cloud reject fallback:', e));

    return true;
  } catch (err) {
    return true;
  }
}

export async function isUsernameTaken(username: string): Promise<boolean> {
  const specs = getLocalSpecialists();
  return specs.some(s => s.username.toLowerCase() === username.toLowerCase());
}

export async function syncDatabase() {
  try {
    const res = await fetch(`${API_BASE}?action=db`);
    if (!res.ok) return;
    const db = await res.json();

    if (db.specialists && Array.isArray(db.specialists) && db.specialists.length > 0) {
      saveLocalSpecialists(db.specialists);
    }
    if (db.centers && Array.isArray(db.centers) && db.centers.length > 0) {
      saveLocalCenters(db.centers);
    }
  } catch (err) {
    // Soft ignore network error
  }
}

export async function uploadLocalData(specialists: Specialist[], centers: Center[]): Promise<boolean> {
  saveLocalSpecialists(specialists);
  saveLocalCenters(centers);
  return true;
}
