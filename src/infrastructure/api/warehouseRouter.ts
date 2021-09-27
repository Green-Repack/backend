import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { WarehouseController } from "../../application/controllers/WarehouseController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let warehouseController: WarehouseController = DIcontainer.resolve<WarehouseController>(WarehouseController)

const warehouseRouter = Router();

warehouseRouter.post("/info/stock", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.getStockInfo)

export default warehouseRouter