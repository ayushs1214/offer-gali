import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { userRoutes } from './routes/users.js';
import { retailerRoutes } from './routes/retailers.js';
import { dealRoutes } from './routes/deals.js';
import { notificationRoutes } from './routes/notifications.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/retailers', retailerRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});