import { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { WarehouseController } from "../../application/controllers/WarehouseController";
import { AuthorizationHandler } from "../services/AuthorizationHandler"

let warehouseController: WarehouseController = DIcontainer.resolve<WarehouseController>(WarehouseController)

const warehouseRouter = Router();

warehouseRouter.post("/create", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.createWarehouse)
warehouseRouter.get("/:name/stock", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, warehouseController.getStockInfo)
warehouseRouter.get("/:name", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, warehouseController.getInfo)
warehouseRouter.get("/", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAuthorization, warehouseController.getAllWarehouses)
warehouseRouter.delete("/:id", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.deleteWarehouse)
warehouseRouter.put("/:id", AuthorizationHandler.userAuth, AuthorizationHandler.greenRepackAdminAuthorization, warehouseController.updateWarehouse)

export default warehouseRouter