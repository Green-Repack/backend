import 'reflect-metadata';
import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { AuthorizationHandler } from "../services/AuthorizationHandler"
import { ProductController } from '../../application/controllers/ProductController';

let productController: ProductController = DIcontainer.resolve<ProductController>(ProductController)

const productRouter = Router();

productRouter.post("/", AuthorizationHandler.userAuth, productController.addProduct)
productRouter.patch("/:id", AuthorizationHandler.userAuth, productController.updateProduct)
productRouter.delete("/:id", AuthorizationHandler.userAuth, productController.deleteProduct)
productRouter.get("/:id", AuthorizationHandler.userAuth, productController.getProduct)

export default productRouter