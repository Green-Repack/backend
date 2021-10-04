import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { PromoController } from "../../application/controllers/PromoController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let promoController: PromoController = DIcontainer.resolve<PromoController>(PromoController)

const promoRouter = Router();

promoRouter.post("/create", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, promoController.createPromo)
promoRouter.delete("/:name", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, promoController.deletePromo)
promoRouter.get("/:name", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, promoController.getPromo)
promoRouter.get("/", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, promoController.getAllPromo)

export default promoRouter