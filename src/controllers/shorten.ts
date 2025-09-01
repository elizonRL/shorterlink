import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import type {  Links, shortUrlCode } from "../interface.ts";
import LinksModels from "../models/linsk.models.js";
import User from "../models/user.models.js";



export const setShortenedUrl = async (req:Request, res:Response) => {
    const { originalUrl } = req.body;
    const  userId = req.user?.userId;
   
    
    if (!originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }
    try{
        // Logic to create a link
        if(!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")){
            return res.status(400).json({ error: "Invalid URL format" });
        }
        const shortUrlCode: shortUrlCode  = nanoid(8);
        const newLink = new LinksModels({
            originalUrl: originalUrl,
            shortUrl: shortUrlCode,
        });
       await newLink.save();
       
         await User.findByIdAndUpdate(userId, {
               $push: { links: newLink._id }
           });

        return res.status(201).json(newLink);
        
    }catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}

export const getShortenedUrl = (req: Request, res: Response) => {
    // Logic to handle redirection
    /* Debo refactorizar este controlador -> este debe buscar el link en la base de datos y redirigir al usuario a la URL original
    si no existe el link en la base de datos debe retornar un error 404, si existe debe redirigir al usuario a la URL original con un status 308 (redireccion permanente) 
    */
    const {shortUrlCode}  = req.params;
    
    if (!shortUrlCode) {
        return res.status(400).json({ error: "Short URL code is required" });
    }
    
    LinksModels.findOne({shortUrl: shortUrlCode}).then((link)=>{
        if(!link){
            return res.status(404).json({ error: "Short URL not found in DB" });
        }
        return res.status(308).redirect(link.originalUrl);
    }).catch((err)=>{
        return res.status(500).json({ error: "Internal Server Error" , details: err});
    })
    // Logic to retrieve the original URL based on the shortUrlCode
    // This is a placeholder as the actual retrieval logic would depend on your data storage solution.
    
}
export const getAll = (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    LinksModels.find({}).then((links)=>{
        return res.status(200).json(
            links
        );
    }).catch((err)=>{
        return res.status(500).json({ error: "Internal Server Error" , details: err});
    })
    return
}