import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.js";

const userRouter = Router();

// Define user-related routes here


userRouter.post('/', createUser);
userRouter.post('/login', loginUser); // Assuming you have a login controller
export default userRouter;