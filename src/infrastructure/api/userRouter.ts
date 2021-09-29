import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { UserController } from "../../application/controllers/UserController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let userController: UserController = DIcontainer.resolve<UserController>(UserController)

const userRouter = Router();

userRouter.get("/info", AuthorizationHandler.userAuth, userController.getUserInfo)
userRouter.put("/info/update", AuthorizationHandler.userAuth, userController.updateUserInfo)
userRouter.post("/give/greencoins", AuthorizationHandler.userAuth, userController.giveGreenCoins)
userRouter.post("/buy", AuthorizationHandler.userAuth, userController.buyProducts)

userRouter.post("/sell", AuthorizationHandler.userAuth, AuthorizationHandler.marchandAuthorization, userController.sellProduct)
userRouter.put("/accept/estimation", AuthorizationHandler.userAuth, AuthorizationHandler.marchandAuthorization, userController.acceptEstimation)
userRouter.put("/accept/counter-offer", AuthorizationHandler.userAuth, AuthorizationHandler.marchandAuthorization, userController.accaptCounterOffer)
userRouter.put("/decline/estimation", AuthorizationHandler.userAuth, AuthorizationHandler.marchandAuthorization, userController.refuseEstimation)
userRouter.put("/decline/counter-offer", AuthorizationHandler.userAuth, AuthorizationHandler.marchandAuthorization, userController.refuseCounterOffer)

export default userRouter