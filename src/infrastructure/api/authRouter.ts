import { Router } from "express";
import { AuthController } from "../../application/controllers/AuthController";

let userController = new AuthController()
const usersRouter = Router();

usersRouter.post('/register', userController.register);
usersRouter.post("/login", userController.login)

export default usersRouter