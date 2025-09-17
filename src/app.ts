import express from 'express';
import linksRouter from './router/links.router.js';
import userRouter from './router/user.router.js';
import { logger, unknownEndpoint, errorHandler, init, authenticateJwt } from './utils/middleware.js';
import mongoose from 'mongoose'; 
import config from './utils/config.js';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
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
  res.send('Hello World!');
});

// Router LINKS
app.use('/api', linksRouter); //-> handles all routes starting with /api
app.use('/api/users', userRouter); //-> handles all routes starting with /api/users
// Middleware UNKNOWN ENDPOINT
app.use(unknownEndpoint); //-> handles requests to unknown endpoints
// Middleware ERROR HANDLER
app.use(errorHandler); //-> handles errors

export default app;

