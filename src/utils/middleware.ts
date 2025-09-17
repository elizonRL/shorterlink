
import type { Request, Response, NextFunction } from 'express'; // Import types from express
import passport from 'passport';
import {Strategy as jwtstrategy, ExtractJwt} from 'passport-jwt'; // Import passport-jwt for JWT strategy
import config from './config.js';
// Middleware to log requests
export const logger = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}
// Middleware to handle unknown endpoints
export const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }else if(error.name === 'MongoServerError'){
        return res.status(400).send({error: `Username already exists`})
    }
  
    next(error);
}

export const init = () => {
  const secret = config.JWT_SECRET;
  if (!secret) 
    throw new Error('JWT_SECRET is not defined');
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: secret
  }
  passport.use(new jwtstrategy(opts, (decode, done) => {
    return done(null, decode)
  }));
}
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  if(req.method === 'OPTIONS' || req.path === '/' || req.path.startsWith('/api/users')|| req.path.startsWith('/api/short')) {
    return next();
  }
  return passport.authenticate('jwt', {session: false})(req, res, next);
}