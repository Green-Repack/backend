import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { WarehouseController } from "../../application/controllers/WarehouseController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let warehouseController: WarehouseController = DIcontainer.resolve<WarehouseController>(WarehouseController)

const warehouseRouter = Router();

warehouseRouter.post("/create", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.createWarehouse)
warehouseRouter.get("/info/stock", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.getStockInfo)
warehouseRouter.get("/", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.getAllWarehouses)

export default warehouseRouter