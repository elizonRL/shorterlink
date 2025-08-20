import type { Request, Response, NextFunction } from 'express';
import User from '../models/user.models.js'; 

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('links'); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        next(error);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, passwordHash } = req.body;
        const newUser = new User({ email, username, passwordHash });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        next(error);
    }
}
