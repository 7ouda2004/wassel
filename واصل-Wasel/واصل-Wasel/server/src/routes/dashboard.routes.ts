import { Router } from 'express';
import { getCenterPatients, getDashboardSpecialists, upsertSpecialist } from '../controllers/dashboard.controller';
import { authenticate, requireCenterAccess } from '../middlewares/auth.middleware';

const router = Router();

// Protected routes for Center Admins / Super Admin
router.get('/center/:centerId/patients', authenticate, requireCenterAccess, getCenterPatients);
router.get('/center/:centerId/specialists', authenticate, requireCenterAccess, getDashboardSpecialists);
router.post('/center/:centerId/specialists', authenticate, requireCenterAccess, upsertSpecialist);

export default router;
