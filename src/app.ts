import express from 'express';
import linksRouter from './router/links.router.js';
import userRouter from './router/user.router.js';
import { logger, unknownEndpoint, errorHandler, init, authenticateJwt } from './utils/middleware.js';
import mongoose from 'mongoose'; 
import config from './utils/config.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(logger);

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

init();
app.use(authenticateJwt);
// Connect to MongoDB
mongoose.connect(config.MONGODB_URI!)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
    
  });

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Router LINKS
app.use('/api', linksRouter);
app.use('/api/users', userRouter);

// Middleware UNKNOWN ENDPOINT
app.use(unknownEndpoint);
// Middleware ERROR HANDLER
app.use(errorHandler);

export default app;

