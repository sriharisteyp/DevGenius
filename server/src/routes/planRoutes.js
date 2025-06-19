import express from 'express';
import { authenticateToken as auth } from '../middleware/auth.js';
import { getPlans, getPlanById, createSubscription, getUserSubscription } from '../controllers/planController.js';

const router = express.Router();

// Public routes
router.get('/', getPlans);
router.get('/:id', getPlanById);

// Protected routes
router.post('/subscribe', auth, createSubscription);
router.get('/subscription/:userId', auth, getUserSubscription);

export default router;
