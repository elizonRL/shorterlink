import { Router } from "express";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/', (_req, res) => {
    res.send({ message: 'User route is working!' });
});
export default userRouter;