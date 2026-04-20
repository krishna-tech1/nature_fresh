import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import contentRoutes from './routes/content';
import teamRoutes from './routes/team';
import blogRoutes from './routes/blog';
import uploadRoutes from './routes/upload';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import quoteRoutes from './routes/quote';
import inquiryRoutes from './routes/inquiry';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/content', contentRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/', (req, res) => {
  res.send('Nature Fresh Foods Admin API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Trigger reload