import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { ProductController } from "../../application/controllers/ProductController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let productController: ProductController = DIcontainer.resolve<ProductController>(ProductController)

const productRouter = Router();

productRouter.get("/info/sold", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, productController.getSellsNumber)

export default productRouter