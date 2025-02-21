import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import setupSwagger from './config/swagger.js';
import regionRoutes from './routes/region.js';
//import regionRoutes from './routes/regionRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Swagger
setupSwagger(app);

app.use('/api', userRoutes);
app.use('/api/regions', regionRoutes);
//app.use('/api/v2', regionRoutes);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, Express with Javascript!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
