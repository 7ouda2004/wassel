import { Router } from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public route
router.post('/login', login);

// Protected route
router.get('/me', authenticate, getMe);

export default router;
