import { Router } from "express";
import * as crypto from "crypto";

const getRandomString = (): string => {
    return crypto.randomBytes(4).toString('hex');
}

const linksRouter = Router();

linksRouter.get('/', (_req, res) => {
    res.json(
        {
            "message": "Hello World!",
            "randomString": getRandomString(),
        }
    );
});

linksRouter.post('/create', (req, res) => {
    const { url } = req.body;
    // Logic to create a lin
    res.send(`Create link: ${url} with random string ${getRandomString()}`);
});

export default linksRouter;