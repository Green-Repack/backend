import { Router } from "express";
import { AuthVerifications } from "../../application/commons/AuthVerifications";
import { GreenRepackController } from "../../application/controllers/GreenRepackController";

let greenRepackController = new GreenRepackController()
const greenRepackRouter = Router();

greenRepackRouter.post('/createMember', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.createNewMember);
greenRepackRouter.post('/loginMember', greenRepackController.loginMember);

export default greenRepackRouter