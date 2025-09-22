import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import type { shortUrlCode } from "../interface.ts";
import LinksModels from "../models/linsk.models.js";
import User from "../models/user.models.js";

const getUserLinks = async (userId: string | undefined) => {
    if (!userId) return [];
    const user = await User.findById(userId).populate("links");
    return user?.links || [];
}

export const setShortenedUrl = async (req: Request, res: Response) => {
    const { originalUrl } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }
    try {
        // Logic to create a link
        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
            return res.status(400).json({ error: "Invalid URL format" });
        }
        const shortUrlCode: shortUrlCode = nanoid(8);
        const newLink = new LinksModels({
            originalUrl: originalUrl,
            shortUrl: shortUrlCode,
        });
        await newLink.save();

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: { links: newLink._id }
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(201).json(newLink);

    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export const getShortenedUrl = (req: Request, res: Response) => {
    // Logic to handle redirection
    /* Debo refactorizar este controlador -> este debe buscar el link en la base de datos y redirigir al usuario a la URL original
    si no existe el link en la base de datos debe retornar un error 404, si existe debe redirigir al usuario a la URL original con un status 308 (redireccion permanente) 
    */
    const { shortUrlCode } = req.params;

    if (!shortUrlCode) {
        return res.status(400).json({ error: "Short URL code is required" });
    }

    LinksModels.findOne({ shortUrl: shortUrlCode }).then((link) => {
        if (!link) {
            return res.status(404).json({ error: "Short URL not found in DB" });
        }
        return res.status(308).redirect(link.originalUrl);
    }).catch((err) => {
        return res.status(500).json({ error: "Internal Server Error", details: err });
    })
    // Logic to retrieve the original URL based on the shortUrlCode
    // This is a placeholder as the actual retrieval logic would depend on your data storage solution.

}
export const deleteShortenedUrl = async (req: Request, res: Response) => {
    const { shortUrlCode } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!shortUrlCode) {
        return res.status(400).json({ error: "Short URL code is required" });
    }

    try {
        const link = await LinksModels.findOne({ shortUrl: shortUrlCode });
        if (!link) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: { links: link._id }
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        await LinksModels.findByIdAndDelete(link._id);

        return res.status(200).json({ message: "Link deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export const getAll = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    let userLinks = await getUserLinks(userId);
    
    if (!userLinks || userLinks.length === 0){
        return res.status(404).json({ error: "No links found for this user" });
    }
    
    return res.status(200).json(userLinks);
}