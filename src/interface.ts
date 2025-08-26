export interface Links  {
    originalUrl: string;
    shortUrlCode: shortUrlCode;
}

export interface User {
    email: string;
    username: string;
    passwordHash: string;
    links: Links[];
}

export type shortUrlCode = string;