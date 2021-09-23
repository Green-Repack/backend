import 'reflect-metadata';
import { Router } from "express";
import { AuthController } from "../../application/controllers/AuthController";
import DIcontainer from "../../../inversify.config";

let authController: AuthController = DIcontainer.resolve<AuthController>(AuthController)

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post("/login", authController.login)

export default authRouter