import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { GreenRepackController } from "../../application/controllers/GreenRepackController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let greenRepackController: GreenRepackController = DIcontainer.resolve<GreenRepackController>(GreenRepackController)

const greenRepackRouter = Router();

greenRepackRouter.post("/create/member", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.createNewMember)
greenRepackRouter.post("/create/warehouse", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.createWarehouse)
greenRepackRouter.post("/verify/association", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.verifyAssociation)
greenRepackRouter.post("/verify/association/project", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.verifyAssociationProject)
greenRepackRouter.post("/product/add", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.addProduct)

export default greenRepackRouter