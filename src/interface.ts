export interface Links {
    originalUrl: string;
    shortUrlCode: shortUrlCode;
}

export interface User {
    id?: string;
    email: string;
    userName: string;
    passwordHash: string;
    links: Links[];
}

import 'express'
declare global {
    namespace Express {
        interface Request {
            user?: {
                userName: string,
                userId: string
            };
        }
    }
}
export type shortUrlCode = string;