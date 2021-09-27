import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { UserController } from "../../application/controllers/UserController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let userController: UserController = DIcontainer.resolve<UserController>(UserController)

const userRouter = Router();

userRouter.get("/info", AuthorizationHandler.userAuth, userController.getUserInfo)
userRouter.put("/info/update", AuthorizationHandler.userAuth, userController.updateUserInfo)
userRouter.post("/givegreencoins", AuthorizationHandler.userAuth, userController.giveGreenCoins)

export default userRouter