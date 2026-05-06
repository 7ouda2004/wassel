import { Request, Response } from 'express';
import { query as executeQuery } from '../db/connection';
import { v4 as uuidv4 } from 'uuid';

// ========== SPECIALISTS ==========

export const getAllSpecialists = async (req: Request, res: Response) => {
  try {
    const result = await executeQuery(`
      SELECT s.*, c.name_ar as center_name 
      FROM specialists s 
      LEFT JOIN centers c ON s.center_id = c.id
      ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Get specialists error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addSpecialist = async (req: Request, res: Response) => {
  try {
    const { full_name, name_en, phone, username, password, specialization, specialization_en, experience, image, center_id } = req.body;
    
    if (!full_name || !username || !password) {
      return res.status(400).json({ error: 'full_name, username, and password are required' });
    }

    // Check username uniqueness
    const existing = await executeQuery('SELECT id FROM specialists WHERE username = ?', [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const id = uuidv4();
    await executeQuery(`
      INSERT INTO specialists (id, full_name, name_en, phone, username, password, specialization, specialization_en, experience, image, center_id, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [id, full_name, name_en || '', phone || '', username, password, specialization || '', specialization_en || '', experience || 0, image || '', center_id || null]);

    const result = await executeQuery(`
      SELECT s.*, c.name_ar as center_name FROM specialists s LEFT JOIN centers c ON s.center_id = c.id WHERE s.id = ?
    `, [id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Add specialist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSpecialist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Build dynamic update query
    const allowedFields = ['full_name', 'name_en', 'phone', 'username', 'password', 'specialization', 'specialization_en', 'experience', 'image', 'center_id', 'is_active'];
    const setClause: string[] = [];
    const values: any[] = [];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setClause.push(`${field} = ?`);
        values.push(updates[field]);
      }
    }

    if (setClause.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(id);
    await executeQuery(`UPDATE specialists SET ${setClause.join(', ')} WHERE id = ?`, values);

    const result = await executeQuery(`
      SELECT s.*, c.name_ar as center_name FROM specialists s LEFT JOIN centers c ON s.center_id = c.id WHERE s.id = ?
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Specialist not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update specialist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSpecialist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await executeQuery('DELETE FROM specialists WHERE id = ?', [id]);
    res.json({ message: 'Specialist deleted successfully' });
  } catch (error) {
    console.error('Delete specialist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== CENTERS ==========

export const getAllCentersAdmin = async (req: Request, res: Response) => {
  try {
    const result = await executeQuery(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM specialists WHERE center_id = c.id) as specialists_count
      FROM centers c
      ORDER BY c.created_at DESC
    `);

    // Attach products to each center
    for (const center of result.rows) {
      const products = await executeQuery('SELECT * FROM products WHERE center_id = ?', [center.id]);
      center.products = products.rows;
      // Parse JSON arrays
      try { center.services_ar = JSON.parse(center.services_ar || '[]'); } catch { center.services_ar = []; }
      try { center.services_en = JSON.parse(center.services_en || '[]'); } catch { center.services_en = []; }
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Get centers admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addCenter = async (req: Request, res: Response) => {
  try {
    const { name_ar, name_en, phone, username, password, address_ar, address_en, governorate_ar, governorate_en, image, insurance_supported, services_ar, services_en, rating } = req.body;

    if (!name_ar || !username || !password) {
      return res.status(400).json({ error: 'name_ar, username, and password are required' });
    }

    const existing = await executeQuery('SELECT id FROM centers WHERE username = ?', [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const id = uuidv4();
    await executeQuery(`
      INSERT INTO centers (id, name_ar, name_en, phone, username, password, address_ar, address_en, governorate_ar, governorate_en, image, insurance_supported, services_ar, services_en, rating, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [
      id, name_ar, name_en || '', phone || '', username, password,
      address_ar || '', address_en || '', governorate_ar || '', governorate_en || '',
      image || '', insurance_supported ? 1 : 0,
      JSON.stringify(services_ar || []), JSON.stringify(services_en || []),
      rating || 5
    ]);

    const result = await executeQuery('SELECT * FROM centers WHERE id = ?', [id]);
    const center = result.rows[0];
    center.products = [];
    try { center.services_ar = JSON.parse(center.services_ar || '[]'); } catch { center.services_ar = []; }
    try { center.services_en = JSON.parse(center.services_en || '[]'); } catch { center.services_en = []; }

    res.status(201).json(center);
  } catch (error) {
    console.error('Add center error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowedFields = ['name_ar', 'name_en', 'phone', 'username', 'password', 'address_ar', 'address_en', 'governorate_ar', 'governorate_en', 'image', 'insurance_supported', 'working_hours_ar', 'working_hours_en', 'is_active', 'rating'];
    const setClause: string[] = [];
    const values: any[] = [];

    // Handle services_ar/en as JSON
    if (updates.services_ar !== undefined) {
      setClause.push('services_ar = ?');
      values.push(JSON.stringify(updates.services_ar));
    }
    if (updates.services_en !== undefined) {
      setClause.push('services_en = ?');
      values.push(JSON.stringify(updates.services_en));
    }

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setClause.push(`${field} = ?`);
        values.push(updates[field]);
      }
    }

    setClause.push('updated_at = CURRENT_TIMESTAMP');

    if (setClause.length <= 1) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(id);
    await executeQuery(`UPDATE centers SET ${setClause.join(', ')} WHERE id = ?`, values);

    // Handle products update (replace all)
    if (updates.products !== undefined) {
      await executeQuery('DELETE FROM products WHERE center_id = ?', [id]);
      for (const prod of updates.products) {
        const prodId = prod.id || uuidv4();
        await executeQuery(`
          INSERT INTO products (id, center_id, name_ar, name_en, description_ar, description_en, image, price)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [prodId, id, prod.name_ar || '', prod.name_en || '', prod.description_ar || '', prod.description_en || '', prod.image || '', prod.price || 0]);
      }
    }

    // Return updated center
    const result = await executeQuery('SELECT * FROM centers WHERE id = ?', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Center not found' });
    }
    const center = result.rows[0];
    const products = await executeQuery('SELECT * FROM products WHERE center_id = ?', [id]);
    center.products = products.rows;
    try { center.services_ar = JSON.parse(center.services_ar || '[]'); } catch { center.services_ar = []; }
    try { center.services_en = JSON.parse(center.services_en || '[]'); } catch { center.services_en = []; }

    res.json(center);
  } catch (error) {
    console.error('Update center error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await executeQuery('DELETE FROM products WHERE center_id = ?', [id]);
    await executeQuery('UPDATE specialists SET center_id = NULL WHERE center_id = ?', [id]);
    await executeQuery('DELETE FROM centers WHERE id = ?', [id]);
    res.json({ message: 'Center deleted successfully' });
  } catch (error) {
    console.error('Delete center error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== APPROVAL REQUESTS ==========

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const result = await executeQuery('SELECT * FROM approval_requests ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addRequest = async (req: Request, res: Response) => {
  try {
    const { full_name, phone, username, password, type, center_name, specialization } = req.body;

    if (!full_name || !phone || !username || !password || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = uuidv4();
    await executeQuery(`
      INSERT INTO approval_requests (id, full_name, phone, username, password, type, center_name, specialization, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [id, full_name, phone, username, password, type, center_name || null, specialization || null]);

    const result = await executeQuery('SELECT * FROM approval_requests WHERE id = ?', [id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Add request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const approveRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reqResult = await executeQuery('SELECT * FROM approval_requests WHERE id = ?', [id]);
    if (reqResult.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const request = reqResult.rows[0];

    // Update status
    await executeQuery(`UPDATE approval_requests SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP WHERE id = ?`, [id]);

    // Create the account
    if (request.type === 'specialist') {
      const specId = uuidv4();
      await executeQuery(`
        INSERT INTO specialists (id, full_name, phone, username, password, specialization, is_active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `, [specId, request.full_name, request.phone, request.username, request.password, request.specialization || '']);
    } else {
      const centerId = uuidv4();
      await executeQuery(`
        INSERT INTO centers (id, name_ar, phone, username, password, is_active)
        VALUES (?, ?, ?, ?, ?, 1)
      `, [centerId, request.center_name || request.full_name, request.phone, request.username, request.password]);
    }

    res.json({ message: 'Request approved and account created', request: { ...request, status: 'approved' } });
  } catch (error) {
    console.error('Approve request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await executeQuery(`UPDATE approval_requests SET status = 'rejected', reviewed_at = CURRENT_TIMESTAMP WHERE id = ?`, [id]);
    res.json({ message: 'Request rejected' });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== LOGIN ==========

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check admin
    if (username === '616' && password === 'daizer616') {
      return res.json({
        type: 'admin',
        account: { id: 'admin', username: '616', fullName: 'Admin', role: 'admin' }
      });
    }

    // Check specialists
    const specResult = await executeQuery(
      'SELECT s.*, c.name_ar as center_name FROM specialists s LEFT JOIN centers c ON s.center_id = c.id WHERE s.username = ? AND s.password = ? AND s.is_active = 1',
      [username, password]
    );
    if (specResult.rows.length > 0) {
      return res.json({ type: 'specialist', account: specResult.rows[0] });
    }

    // Check centers
    const centerResult = await executeQuery(
      'SELECT * FROM centers WHERE username = ? AND password = ? AND is_active = 1',
      [username, password]
    );
    if (centerResult.rows.length > 0) {
      const center = centerResult.rows[0];
      try { center.services_ar = JSON.parse(center.services_ar || '[]'); } catch { center.services_ar = []; }
      const products = await executeQuery('SELECT * FROM products WHERE center_id = ?', [center.id]);
      center.products = products.rows;
      return res.json({ type: 'center', account: center });
    }

    res.status(401).json({ error: 'Invalid credentials or account pending approval' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
