import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { ProductController } from "../../application/controllers/ProductController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let productController: ProductController = DIcontainer.resolve<ProductController>(ProductController)

const productRouter = Router();

productRouter.get("/", productController.getAllProduct)
productRouter.get("/category/:name", productController.getProductByCategory)
productRouter.get("/category/:category/:brand", productController.getProductByBrand)
productRouter.get("/:category/sold", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, productController.getSellsNumber)
productRouter.get("/waiting/validation", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, productController.getProductForValidation)
productRouter.delete("/:id", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, productController.deleteProduct)
productRouter.get("/:id", productController.getProduct)

export default productRouter