import { Guard } from "../../commons/Guard";
import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { NotFoundError } from "../../errors/NotFoundError";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { WarehouseMap } from "../../mappers/WarehouseMap";
import { IUpdateWarehouseUseCase } from "./IUpdateWarehouseUseCase";

export class UpdateWarehouseUseCase implements IUpdateWarehouseUseCase{
    async execute(warehouseInfo: any, warehouseId: string,warehouseRepository: IWarehouseRepository): Promise<void> {
        Guard.AgainstNullOrUndefined(warehouseInfo.location, "location required")
        Guard.AgainstNullOrUndefined(warehouseInfo.name, "name required")

        let warehouse = await warehouseRepository.getWarehouseById(warehouseId)
        if(!warehouse) throw new NotFoundError("Warehouse doesn't exist !")

        let warehouseDTO: IWarehouseDTO = {
            id: warehouseId,
            name: warehouseInfo.name,
            location: warehouseInfo.location,
            stock: warehouse.stock
        }

        await warehouseRepository.save(WarehouseMap.toDomain(warehouseDTO))
    }

}