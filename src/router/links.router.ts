import { Router } from "express";
import * as crypto from "crypto";
import { nanoid } from "nanoid";
import { setShortenedUrl } from "../controllers/shorten.js";

const getRandomString = (): string => {
    return crypto.randomBytes(4).toString('hex');
}

const linksRouter = Router();

linksRouter.get('/', (_req, res) => {
    res.json(
        {
            "message": "Hello World!",
            "randomString": getRandomString(),
            "nanoid": nanoid(8),
        }
    );
});

linksRouter.post('/', setShortenedUrl);

export default linksRouter;