import { Router } from "express";
import { setShortenedUrl, getShortenedUrl, getAll, deleteShortenedUrl } from "../controllers/shorten.js";


const linksRouter = Router();

linksRouter.get('/short/:shortUrlCode', getShortenedUrl);
linksRouter.delete("/:shortUrlCode", deleteShortenedUrl)
linksRouter.get('/', getAll);
linksRouter.post('/', setShortenedUrl);

export default linksRouter;