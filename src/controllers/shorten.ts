import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import type {  Links, shortUrlCode } from "../interface.ts";

let links: Links[] = [];

export const setShortenedUrl = (req:Request, res:Response) => {
    const { originalUrl } = req.body;
    
    if (!originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }
    try{
        // Logic to create a link
        if(!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")){
            return res.status(400).json({ error: "Invalid URL format" });
        }
        const shortUrlCode: shortUrlCode  = nanoid(8);
        const link: Links = {
            originalUrl: originalUrl,
            shortUrlCode: shortUrlCode,
        };
        links.push(link);
        return res.status(201).json(link);
    }catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}

export const getShortenedUrl = (req: Request, res: Response) => {
    const {shortUrlCode}  = req.params;
    console.log("shortUrlCode", shortUrlCode);
    console.log(req.params.shortUrlCode);
    if (!shortUrlCode) {
        return res.status(400).json({ error: "Short URL code is required" });
    }
    
    const link = links.find(l => l.shortUrlCode === shortUrlCode);
    if (!link) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(308).redirect(link.originalUrl);
    // Logic to retrieve the original URL based on the shortUrlCode
    // This is a placeholder as the actual retrieval logic would depend on your data storage solution.
    
}
export const getAll = (_req: Request, res: Response) => {
    res.json(
        links
    );
}