import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { GreenRepackController } from "../../application/controllers/GreenRepackController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let greenRepackController: GreenRepackController = DIcontainer.resolve<GreenRepackController>(GreenRepackController)

const greenRepackRouter = Router();

greenRepackRouter.post("/create", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.createNewMember)
greenRepackRouter.post("/association/verify", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.verifyAssociation)
greenRepackRouter.post("/association/verify/project", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.verifyAssociationProject)
greenRepackRouter.post("/product/add", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.addProduct)

greenRepackRouter.post("/product/accept", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.acceptProduct)
greenRepackRouter.post("/product/decline", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.refuseProduct)

export default greenRepackRouter
