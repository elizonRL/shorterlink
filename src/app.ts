import express from 'express';
import linksRouter from './router/links.router.js';


const app = express();
app.use(express.json());


app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/api/', linksRouter);

export default app;