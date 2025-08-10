import { Router } from "express";
import { setShortenedUrl, getShortenedUrl, getAll } from "../controllers/shorten.js";


const linksRouter = Router();

linksRouter.get('/:shortUrlCode', getShortenedUrl);
linksRouter.get('/', getAll);
linksRouter.post('/', setShortenedUrl);

export default linksRouter;