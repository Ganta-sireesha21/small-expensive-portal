import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import groupRoutes from './routes/groupRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';



const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/groups', groupRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});