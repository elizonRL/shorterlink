import { Router } from "express";
import { createUser, getUser, getAllUsers, loginUser } from "../controllers/user.js";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/:id', getUser);
userRouter.get('/', getAllUsers);

userRouter.post('/', createUser);
userRouter.post('/login', loginUser); // Assuming you have a login controller
export default userRouter;