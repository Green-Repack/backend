import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { GreenRepackController } from "../../application/controllers/GreenRepackController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let greenRepackController: GreenRepackController = DIcontainer.resolve<GreenRepackController>(GreenRepackController)

const greenRepackRouter = Router();

greenRepackRouter.post("/create", greenRepackController.createNewMember)
greenRepackRouter.get("/info", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, greenRepackController.getInfo)
greenRepackRouter.post("/association/verify", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.verifyAssociation)
greenRepackRouter.post("/association/project/verify", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.verifyAssociationProject)
greenRepackRouter.post("/product/add", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.addProduct)

greenRepackRouter.put("/product/accept", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, greenRepackController.acceptProduct)
greenRepackRouter.put("/product/counter-offer", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, greenRepackController.makeCounterOffer)
greenRepackRouter.put("/product/decline", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, greenRepackController.refuseProduct)

export default greenRepackRouter
