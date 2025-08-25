import { Router } from "express";
import { createUser, getUser, getAllUsers } from "../controllers/user.js";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/:id', getUser);
userRouter.get('/', getAllUsers);

userRouter.post('/', createUser);
export default userRouter;