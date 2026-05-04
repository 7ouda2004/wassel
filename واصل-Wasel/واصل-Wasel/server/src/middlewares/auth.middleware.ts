import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/auth';

// Extend Express Request object to include user payload
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    // Attach user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export const requireRole = (roles: Array<'super_admin' | 'center_admin' | 'specialist'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

// Middleware specifically for Center Admins to ensure they only access their own center's data
// It assumes the centerId being requested is passed as a route param or body field
export const requireCenterAccess = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  // Super admins can access everything
  if (req.user.role === 'super_admin') {
    return next();
  }

  // Determine requested center ID from params, query, or body
  const requestedCenterId = req.params.centerId || req.query.center_id || req.body.center_id;

  if (!requestedCenterId) {
    return res.status(400).json({ error: 'Center ID must be provided to check access.' });
  }

  // Check if center admin's center_id matches the requested center_id
  if (req.user.role === 'center_admin' && req.user.center_id !== requestedCenterId) {
    return res.status(403).json({ error: 'Access denied. You can only access data for your own center.' });
  }

  next();
};
