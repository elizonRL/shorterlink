import type { Request, Response, NextFunction } from 'express';
import User from '../models/user.models.js';
import { hashPassword } from '../utils/crypto.js';
import type { User as UserInterface } from '../interface.js';
import { comparePassword } from '../utils/crypto.js';

/* get userName and return the objet to data base*/
const getUserByName = async (username: string): Promise<UserInterface | null> => {
    return await User.findOne({ username });
}

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
        const { email, username, password } = req.body;
        const passwordHash = await hashPassword(password);
        const newUser = new User({ email, username, passwordHash });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().populate('links');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByName(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await comparePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        next(error);
    }
    
}
