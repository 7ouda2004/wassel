// Vercel Serverless Function — Cloud Registration Database proxy
// This proxies database operations to the jsonbin-zeta.vercel.app storage bin.
// This solves all CORS issues because the browser talks to the same origin (Vercel).

const STORAGE_URL = 'https://jsonbin-zeta.vercel.app/api/bins/WEnPaFzwcT';

// Helper: Get the whole DB from cloud
async function getDb() {
  try {
    const res = await fetch(STORAGE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      registration_requests: data.registration_requests || [],
      specialists: data.specialists || [],
      centers: data.centers || []
    };
  } catch (err) {
    console.error('getDb error:', err);
    return { registration_requests: [], specialists: [], centers: [] };
  }
}

// Helper: Save the whole DB to cloud
async function saveDb(db) {
  try {
    const res = await fetch(STORAGE_URL, {
      method: 'PUT',
      body: JSON.stringify(db),
      headers: { 'Content-Type': 'application/json' }
    });
    return res.ok;
  } catch (err) {
    console.error('saveDb error:', err);
    return false;
  }
}

// CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
}

export default async function handler(req, res) {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  const { action } = req.query;

  try {
    // GET /api/registrations?action=pending — get all pending requests
    if (req.method === 'GET' && action === 'pending') {
      const db = await getDb();
      return res.status(200).json(db.registration_requests || []);
    }

    // GET /api/registrations?action=db — get full db for sync
    if (req.method === 'GET' && action === 'db') {
      const db = await getDb();
      return res.status(200).json(db);
    }

    // POST /api/registrations?action=submit — submit a new request
    if (req.method === 'POST' && action === 'submit') {
      const db = await getDb();
      const body = req.body;

      const newRequest = {
        ...body,
        id: Date.now().toString(),
        status: 'pending',
        submitted_at: new Date().toISOString()
      };

      db.registration_requests = db.registration_requests || [];
      db.registration_requests.push(newRequest);

      const ok = await saveDb(db);
      if (ok) {
        return res.status(200).json({ ok: true, id: newRequest.id });
      } else {
        return res.status(500).json({ ok: false, error: 'فشل في حفظ البيانات' });
      }
    }

    // POST /api/registrations?action=approve — approve a request
    if (req.method === 'POST' && action === 'approve') {
      const { id, type } = req.body;
      const db = await getDb();

      const reqItem = (db.registration_requests || []).find(r => r.id === id);
      if (!reqItem) {
        return res.status(404).json({ ok: false, error: 'الطلب غير موجود' });
      }

      reqItem.status = 'approved';
      reqItem.reviewed_at = new Date().toISOString();

      // Add to specialists or centers
      if (reqItem.type === 'specialist') {
        db.specialists = db.specialists || [];
        db.specialists.push({
          id: reqItem.id,
          name: reqItem.full_name,
          username: reqItem.username,
          password: reqItem.password,
          role: reqItem.role || 'أخصائي أطراف صناعية وجبائر طبية',
          bio: reqItem.bio || 'أخصائي متمرس في الأطراف الصناعية والأجهزة التقويمية الحديثة.',
          image: reqItem.image || '/images/new.jpg',
          expertise: [],
          status: 'active',
          phone: reqItem.phone
        });
      } else if (reqItem.type === 'center') {
        db.centers = db.centers || [];
        db.centers.push({
          id: reqItem.id,
          name: reqItem.center_name || reqItem.full_name,
          location: reqItem.location || 'القاهرة',
          address: reqItem.address || '',
          phone: reqItem.phone,
          workingHours: reqItem.working_hours || 'السبت - الخميس: 9 صباحاً - 9 مساءً',
          image: reqItem.image || '/images/ortho.png',
          region: reqItem.region || 'القاهرة الكبرى',
          status: 'active'
        });
      }

      const ok = await saveDb(db);
      return res.status(200).json({ ok });
    }

    // POST /api/registrations?action=reject — reject a request
    if (req.method === 'POST' && action === 'reject') {
      const { id } = req.body;
      const db = await getDb();

      const reqItem = (db.registration_requests || []).find(r => r.id === id);
      if (!reqItem) {
        return res.status(404).json({ ok: false, error: 'الطلب غير موجود' });
      }

      reqItem.status = 'rejected';
      reqItem.reviewed_at = new Date().toISOString();

      const ok = await saveDb(db);
      return res.status(200).json({ ok });
    }

    // POST /api/registrations?action=check_username — check if username is taken
    if (req.method === 'POST' && action === 'check_username') {
      const { username } = req.body;
      const db = await getDb();

      const taken =
        (db.registration_requests || []).some(r => r.username === username) ||
        (db.specialists || []).some(s => s.username === username) ||
        (db.centers || []).some(c => c.username === username);

      return res.status(200).json({ taken });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
