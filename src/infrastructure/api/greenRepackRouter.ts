import { Router } from "express";
import { AuthorizationHandler } from "../services/AuthorizationHandler";
import { GreenRepackController } from "../../application/controllers/GreenRepackController";

const greenRepackRouter = Router();

//greenRepackRouter.post('/createMember', AuthorizationHandler.userAuth,  AuthorizationHandler.greenRepackAdminAuthorization, greenRepackController.createNewMember);


export default greenRepackRouter