export interface Links  {
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

export type shortUrlCode = string;