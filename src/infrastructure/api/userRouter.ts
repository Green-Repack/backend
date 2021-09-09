import { Router, request, response } from "express";
import { UserController } from "../../application/controllers/UserController";

let userController = new UserController()
const usersRouter = Router();

usersRouter.post('/register', userController.register);
usersRouter.post("/login", userController.login)

export default usersRouter