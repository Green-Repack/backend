import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { PromoController } from "../../application/controllers/PromoController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let promoController: PromoController = DIcontainer.resolve<PromoController>(PromoController)

const promoRouter = Router();

promoRouter.post("/create", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, promoController.createPromo)

export default promoRouter