import { Router } from "express";
import { setShortenedUrl } from "../controllers/shorten.js";

const linksRouter = Router();

linksRouter.get('/', (_req, res) => {
    res.json(
        {
            message: "Welcome to the URL Shortener API",
        }
    );
});

linksRouter.post('/', setShortenedUrl);

export default linksRouter;