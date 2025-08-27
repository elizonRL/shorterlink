import { nanoid } from "nanoid";
import Links from "../models/linsk.models.js";

export const inicialLinks = [
    { originalUrl: 'https://example.com',
        shortUrl: nanoid(8)
     },
    { originalUrl: 'https://another-example.com',
        shortUrl: nanoid(8)
     },
];

export const newUser = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'testpassword'
}

export const linksInDb = async () => {
   const links = await Links.find({}).exec()
    return links.map(link => link.toJSON());
}