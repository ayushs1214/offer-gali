import express from 'express';
import { notificationController } from '../controllers/notificationController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, notificationController.getUserNotifications);
router.patch('/:id/read', authenticateUser, notificationController.markAsRead);

export const notificationRoutes = router;