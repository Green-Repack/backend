import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { ProductController } from "../../application/controllers/ProductController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let productController: ProductController = DIcontainer.resolve<ProductController>(ProductController)

const productRouter = Router();

productRouter.get("/", productController.getAllProduct)
productRouter.get("/category", productController.getProductByCategory)
productRouter.get("/category/brand", productController.getProductByBrand)
productRouter.get("/info/sold", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, productController.getSellsNumber)

export default productRouter