/**
 * Shared Cloud-backed database using a free, zero-config REST API (extendsclass.com).
 * This ensures that registration requests, specialists, and centers sync
 * in real-time across ALL networks, ALL devices, and Vercel deployments.
 */

import { defaultSpecialists, defaultCenters, type Specialist, type Center } from './db';

const BIN_ID = 'aefffdb';
const DB_URL = `https://extendsclass.com/api/json-storage/bin/${BIN_ID}`;

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

interface CloudSchema {
  registration_requests: RegistrationRequest[];
  specialists: any[];
  centers: any[];
}

// ─── Helper: Fetch whole DB from Cloud ──────────────────────────────────────

async function getCloudDb(): Promise<CloudSchema> {
  try {
    const res = await fetch(DB_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      registration_requests: data.registration_requests || [],
      specialists: data.specialists || [],
      centers: data.centers || []
    };
  } catch (err) {
    console.error('getCloudDb error:', err);
    return { registration_requests: [], specialists: [], centers: [] };
  }
}

// ─── Helper: Save whole DB to Cloud ─────────────────────────────────────────

async function saveCloudDb(db: CloudSchema): Promise<boolean> {
  try {
    const res = await fetch(DB_URL, {
      method: 'PUT',
      body: JSON.stringify(db),
      headers: { 'Content-Type': 'application/json' }
    });
    return res.ok;
  } catch (err) {
    console.error('saveCloudDb error:', err);
    return false;
  }
}

// ─── Submit a new registration request ──────────────────────────────────────

export async function submitRegistration(
  data: Omit<RegistrationRequest, 'id' | 'submitted_at' | 'reviewed_at'>
): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = await getCloudDb();
    
    const newRequest: RegistrationRequest = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      submitted_at: new Date().toISOString()
    };

    db.registration_requests.push(newRequest);
    const ok = await saveCloudDb(db);
    return ok ? { ok: true } : { ok: false, error: 'سيرفر قاعدة البيانات غير مستجيب' };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// ─── Fetch pending requests (admin) ─────────────────────────────────────────

export async function getPendingRequests(): Promise<RegistrationRequest[]> {
  const db = await getCloudDb();
  return db.registration_requests;
}

// ─── Approve a request ───────────────────────────────────────────────────────

export async function approveRequest(id: string): Promise<boolean> {
  const db = await getCloudDb();
  const req = db.registration_requests.find(r => r.id === id);
  if (req) {
    req.status = 'approved';
    req.reviewed_at = new Date().toISOString();
    return await saveCloudDb(db);
  }
  return false;
}

// ─── Reject a request ────────────────────────────────────────────────────────

export async function rejectRequest(id: string): Promise<boolean> {
  const db = await getCloudDb();
  const req = db.registration_requests.find(r => r.id === id);
  if (req) {
    req.status = 'rejected';
    req.reviewed_at = new Date().toISOString();
    return await saveCloudDb(db);
  }
  return false;
}

// ─── Delete a request permanently ────────────────────────────────────────────

export async function deleteRequest(id: string): Promise<boolean> {
  const db = await getCloudDb();
  db.registration_requests = db.registration_requests.filter(r => r.id !== id);
  return await saveCloudDb(db);
}

// ─── Check if username is already taken ──────────────────────────────────────

export async function isUsernameTaken(username: string): Promise<boolean> {
  const db = await getCloudDb();
  
  const inReqs = db.registration_requests.some(r => r.username === username);
  const inSpecs = db.specialists.some(s => s.username === username);
  const inCenters = db.centers.some(c => c.username === username);

  return inReqs || inSpecs || inCenters;
}

// ─── Sync Cloud DB to LocalStorage ──────────────────────────────────────────

export async function syncDatabase() {
  try {
    const db = await getCloudDb();

    // 1. Load & Sync Specialists
    const localSpecsSaved = localStorage.getItem('specialists');
    const localSpecs: Specialist[] = localSpecsSaved ? JSON.parse(localSpecsSaved) : defaultSpecialists;

    const mergedSpecs = [...localSpecs];
    db.specialists.forEach((dbSpec: any) => {
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
    db.centers.forEach((dbCenter: any) => {
      const mappedCenter: Center = {
        id: dbCenter.id || dbCenter.name,
        name: dbCenter.name,
        location: dbCenter.location || 'القاهرة',
        address: dbCenter.address || '',
        phone: dbCenter.phone,
        workingHours: dbCenter.workingHours || dbCenter.working_hours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
        image: dbCenter.image || '/images/ortho.png',
        region: dbCenter.region || 'القاهرة الكبرى',
        description: dbCenter.description || `مركز واصل المعتمد في محافظة ${dbCenter.location || 'القاهرة'}. نوفر أحدث الأطراف والجبائر التقويمية تحت إشراف طبي معتمد وبأعلى كفاءة.`,
        services: dbCenter.services || [
          'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
          'جبائر تقويم العظام المخصصة (AFO, KAFO)',
          'تصميم الفرش الطبي والأحذية الطبية المخصصة باستخدام تقنيات قياس الضغط',
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
    console.error('syncDatabase unexpected error:', err);
  }
}

// ─── Approve specialist in database ──────────────────────────────────────────

export async function approveSpecialistInDb(request: RegistrationRequest): Promise<boolean> {
  try {
    const db = await getCloudDb();
    
    // Add to cloud specialists list
    const newSpec = {
      id: request.id,
      name: request.full_name,
      username: request.username,
      password: request.password,
      role: request.role || 'أخصائي أطراف صناعية وجبائر طبية',
      bio: request.bio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
      image: request.image || '/images/new.jpg',
      expertise: [],
      status: 'active',
      phone: request.phone
    };

    db.specialists.push(newSpec);

    // Update request status
    const req = db.registration_requests.find(r => r.id === request.id);
    if (req) {
      req.status = 'approved';
      req.reviewed_at = new Date().toISOString();
    }

    return await saveCloudDb(db);
  } catch (err) {
    console.error('approveSpecialistInDb error:', err);
    return false;
  }
}

// ─── Approve center in database ──────────────────────────────────────────────

export async function approveCenterInDb(request: RegistrationRequest): Promise<boolean> {
  try {
    const db = await getCloudDb();
    
    // Add to cloud centers list
    const newCenter = {
      id: request.id,
      name: request.center_name || request.full_name,
      location: request.location || 'القاهرة',
      address: request.address || '',
      phone: request.phone,
      workingHours: request.working_hours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
      image: request.image || '/images/ortho.png',
      region: request.region || 'القاهرة الكبرى',
      description: `مركز واصل المعتمد في محافظة ${request.location || 'القاهرة'}. نوفر أحدث الأطراف والجبائر التقويمية تحت إشراف طبي معتمد وبأعلى كفاءة.`,
      services: [
        'تصميم وتركيب الأطراف الصناعية الذكية (علوية وسفلية)',
        'جبائر تقويم العظام المخصصة (AFO, KAFO)',
        'تصميم الفرش الطبي والأحذية الطبية المخصصة باستخدام تقنيات قياس الضغط',
        'صيانة دورية فورية وتعديل مقاسات الأجهزة والجبائر',
        'جلسات تدريب وتأهيل حركي مجانية للمرضى الجدد'
      ],
      reviews: [],
      status: 'active'
    };

    db.centers.push(newCenter);

    // Update request status
    const req = db.registration_requests.find(r => r.id === request.id);
    if (req) {
      req.status = 'approved';
      req.reviewed_at = new Date().toISOString();
    }

    return await saveCloudDb(db);
  } catch (err) {
    console.error('approveCenterInDb error:', err);
    return false;
  }
}
