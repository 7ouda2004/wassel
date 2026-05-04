import { Request, Response } from 'express';
import { query as executeQuery } from '../db/connection';

// Get all centers
export const getAllCenters = async (req: Request, res: Response) => {
  try {
    const { governorate, region } = req.query;
    let queryStr = `
      SELECT c.*, 
             (SELECT COUNT(*) FROM specialists WHERE center_id = c.id AND is_available = 1) as specialists_count
      FROM centers c
      WHERE c.is_active = 1
    `;
    const params: any[] = [];
    
    if (governorate) {
      params.push(governorate);
      queryStr += ` AND (c.governorate_ar = $${params.length} OR c.governorate_en = $${params.length})`;
    }
    
    if (region) {
      params.push(region);
      queryStr += ` AND (c.region_ar = $${params.length} OR c.region_en = $${params.length})`;
    }
    
    queryStr += ' ORDER BY c.name_ar ASC';

    const result = await executeQuery(queryStr, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get centers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single center by ID
export const getCenterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await executeQuery('SELECT * FROM centers WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Center not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get center by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get specialists for a specific center
export const getCenterSpecialists = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await executeQuery(
      'SELECT * FROM specialists WHERE center_id = $1 AND is_available = 1 ORDER BY name_ar ASC',
      [id]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get center specialists error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
