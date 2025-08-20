import express from 'express';
import linksRouter from './router/links.router.js';
import { handelError, logger, unknownEndpoint } from './utils/middleware.js';
import mongoose from 'mongoose'; 
import config from './utils/config.js';


const app = express();
app.use(express.json());
// Connect to MongoDB
mongoose.connect(config.MONGODB_URI!)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
    
  });

// Middleware LOGGER 
app.use(logger)//-> logs all requests to the console 

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Router LINKS
app.use('/api', linksRouter); //-> handles all routes starting with /api

// Middleware UNKNOWN ENDPOINT
app.use(unknownEndpoint); //-> handles requests to unknown endpoints
app.use(handelError); // -> handle middleware of errors

export default app;

