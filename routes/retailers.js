import express from 'express';
import { retailerController } from '../controllers/retailerController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, retailerController.getAll);
router.get('/:id', authenticateUser, retailerController.getById);

export const retailerRoutes = router;