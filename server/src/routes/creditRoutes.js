import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getUserCredits, updateCredits } from '../controllers/creditController.js';

const router = express.Router();

// Get user's credit information
router.get('/', authenticateToken, getUserCredits);

// Update user's credit usage
router.post('/update', authenticateToken, updateCredits);

export default router;
