import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { AssociationController } from '../../application/controllers/AssociationController';
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let associationController: AssociationController = DIcontainer.resolve<AssociationController>(AssociationController)

const associationRouter = Router();

associationRouter.post('/register', associationController.createAssociation);
associationRouter.post('/create/project/action', AuthorizationHandler.userAuth, AuthorizationHandler.associationAuthorization ,associationController.createAction);
associationRouter.post('/create/project', AuthorizationHandler.userAuth, AuthorizationHandler.associationAuthorization, associationController.createProject);
associationRouter.get("/getInfo", AuthorizationHandler.userAuth, associationController.getInfo)
associationRouter.get("/getAllAssociations", AuthorizationHandler.userAuth, associationController.getAllAssociations)

export default associationRouter