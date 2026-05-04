import { Router } from 'express';
import { getAllCenters, getCenterById, getCenterSpecialists } from '../controllers/centers.controller';

const router = Router();

// Public routes for patient booking flow
router.get('/', getAllCenters);
router.get('/:id', getCenterById);
router.get('/:id/specialists', getCenterSpecialists);

export default router;
