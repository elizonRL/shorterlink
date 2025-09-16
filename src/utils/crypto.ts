import bcrypt from 'bcrypt';
import config from './config.js';

export const hashPassword = async (password: string): Promise<string> => {
    
    return await bcrypt.hash(password, config.SALT_ROUNDS);
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}