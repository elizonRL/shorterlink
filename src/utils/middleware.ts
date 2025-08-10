
import type { Request, Response, NextFunction } from 'express'; // Import types from express
// Middleware to log requests
export const logger = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
    /* Alternatively, you can use:
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    */  
}
// Middleware to handle unknown endpoints
export const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
    /* Alternatively, you can send a simple text response:
    res.status(404).send('unknown endpoint');
    */
}