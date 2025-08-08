import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import type {  Links, shortUrlCode } from "../interface.ts";

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
        return res.status(201).json(link);
    }catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}