import { Router } from "express";
import { AuthVerifications } from "../../application/controllers/commons/AuthVerifications";
import { GreenRepackController } from "../../application/controllers/GreenRepackController";

let greenRepackController = new GreenRepackController()
const greenRepackRouter = Router();

greenRepackRouter.post('/createMember', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.createNewMember);
greenRepackRouter.post('/loginMember', greenRepackController.loginMember);

greenRepackRouter.get('/stock/category', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.getStockInfoByCategory);
greenRepackRouter.get('/stock/entrepot/category', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.getStockInfoByCategoryFromEntrepot);

greenRepackRouter.get('/stock/brand', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.getStockInfoByBrand);
greenRepackRouter.get('/stock/entrepot/brand', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.getStockInfoByBrandFromEntrepot);

greenRepackRouter.get('/stock/model', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.getStockInfoByModel);
greenRepackRouter.get('/stock/entrepot/model', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.getStockInfoByModelFromEntrepot);

greenRepackRouter.post('/product/category/addCategory', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.addNewProductCategory);
greenRepackRouter.delete('/product/category/deleteCategory', AuthVerifications.userAuth,  AuthVerifications.greenRepackAdminAuthorization, greenRepackController.deleteProductCategory);

export default greenRepackRouter