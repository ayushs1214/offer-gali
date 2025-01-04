import express from 'express';
import { dealController } from '../controllers/dealController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, dealController.getAll);
router.get('/:id', authenticateUser, dealController.getById);

export const dealRoutes = router;