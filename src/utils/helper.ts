import Links from "../models/linsk.models.js";

export const inicialLinks = [
    { originalUrl: 'https://example.com', },
    { originalUrl: 'https://another-example.com', },
];
export const linksInDb = async () => {
   const links = await Links.find({})
    return links.map(link => link.toJSON());
}