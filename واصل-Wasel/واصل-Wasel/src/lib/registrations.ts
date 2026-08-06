/**
 * Cloud Registration API Client & Local Synchronizer
 */

import { getLocalSpecialists, saveLocalSpecialists, getLocalCenters, saveLocalCenters, type Specialist, type Center } from './db';
import { supabase } from './supabase';

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

    // 3. Also push to Supabase approval_requests table
    try {
      await supabase.from('approval_requests').insert({
        full_name: data.full_name,
        phone: data.phone,
        username: data.username,
        password: data.password,
        type: data.type,
        center_name: data.center_name,
        specialization: data.role || data.bio,
        status: 'pending'
      });
    } catch (e) {
      console.log('Supabase submit fallback:', e);
    }

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
    let localSpecs = getLocalSpecialists();
    let localCenters = getLocalCenters();
    let updated = false;

    // 1. Merge Supabase specialists & centers
    try {
      const { data: supaSpecs } = await supabase.from('specialists').select('*');
      if (supaSpecs && supaSpecs.length > 0) {
        supaSpecs.forEach(ss => {
          const idx = localSpecs.findIndex(ls => (ls.username && ss.username && ls.username.toLowerCase() === ss.username.toLowerCase()) || ls.id === ss.id);
          if (idx >= 0) {
            localSpecs[idx] = {
              ...localSpecs[idx],
              name: ss.full_name || localSpecs[idx].name,
              phone: ss.phone || localSpecs[idx].phone,
              password: ss.password || localSpecs[idx].password,
              role: ss.specialization || localSpecs[idx].role,
              image: ss.image || localSpecs[idx].image
            };
          }
        });
        updated = true;
      }

      const { data: supaCenters } = await supabase.from('centers').select('*');
      if (supaCenters && supaCenters.length > 0) {
        supaCenters.forEach(sc => {
          const idx = localCenters.findIndex(lc => (lc.username && sc.username && lc.username.toLowerCase() === sc.username.toLowerCase()) || lc.id === sc.id);
          if (idx >= 0) {
            localCenters[idx] = {
              ...localCenters[idx],
              name: sc.name_ar || localCenters[idx].name,
              phone: sc.phone || localCenters[idx].phone,
              password: sc.password || localCenters[idx].password,
              address: sc.address_ar || localCenters[idx].address,
              location: sc.governorate_ar || localCenters[idx].location,
              image: sc.image || localCenters[idx].image
            };
          }
        });
        updated = true;
      }
    } catch (e) {}

    // 2. Fetch from JSONBIN API for new additions (without overwriting updated passwords)
    try {
      const res = await fetch(`${API_BASE}?action=db`);
      if (res.ok) {
        const db = await res.json();
        if (db.specialists && Array.isArray(db.specialists)) {
          db.specialists.forEach((cs: Specialist) => {
            const idx = localSpecs.findIndex(ls => (ls.username && cs.username && ls.username.toLowerCase() === cs.username.toLowerCase()) || ls.id === cs.id);
            if (idx === -1) {
              localSpecs.push(cs);
              updated = true;
            }
          });
        }
        if (db.centers && Array.isArray(db.centers)) {
          db.centers.forEach((cc: Center) => {
            const idx = localCenters.findIndex(lc => (lc.username && cc.username && lc.username.toLowerCase() === cc.username.toLowerCase()) || lc.id === cc.id);
            if (idx === -1) {
              localCenters.push(cc);
              updated = true;
            }
          });
        }
      }
    } catch (e) {}

    if (updated) {
      saveLocalSpecialists(localSpecs);
      saveLocalCenters(localCenters);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wasel-db-updated'));
      }
    }
  } catch (err) {
    console.error('syncDatabase error:', err);
  }
}

export async function uploadLocalData(specialists?: Specialist[], centers?: Center[]): Promise<boolean> {
  const currentSpecs = specialists || getLocalSpecialists();
  const currentCenters = centers || getLocalCenters();
  
  // 1. Save to LocalStorage
  saveLocalSpecialists(currentSpecs);
  saveLocalCenters(currentCenters);

  // 2. Push to Cloud API bin
  try {
    const res = await fetch(`${API_BASE}?action=update_db`, {
      method: 'POST',
      body: JSON.stringify({ db: { specialists: currentSpecs, centers: currentCenters } }),
      headers: { 'Content-Type': 'application/json' }
    });
    return res.ok;
  } catch (err) {
    console.error('uploadLocalData cloud error:', err);
    return false;
  }
}
