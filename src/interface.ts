export interface Links  {
    originalUrl: string;
    shortUrlCode: shortUrlCode;
}

export interface User {
    id?: string;
    email: string;
    username: string;
    passwordHash: string;
    links: Links[];
}

export type shortUrlCode = string;