import { Guard } from "../../commons/Guard"
import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO"
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository"
import { WarehouseMap } from "../../mappers/WarehouseMap"
import { IUpdateWarehouseUseCase } from "./IUpdateWarehouseUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class UpdateWarehouseUseCase implements IUpdateWarehouseUseCase{
    async execute(warehouseInfo: any, warehouseId: string,warehouseRepository: IWarehouseRepository): Promise<void> {
        Guard.AgainstNullOrUndefined(warehouseInfo.location, "location required")
        Guard.AgainstNullOrUndefined(warehouseInfo.name, "name required")

        let warehouse = await warehouseRepository.getWarehouseById(warehouseId)
        if(!warehouse) throw new NotFoundError("Warehouse doesn't exist !")

        let warehouseDTO: IWarehouseDTO = WarehouseMap.toDTO(warehouse)
        if (warehouseInfo.location != undefined) warehouseDTO.location = warehouseInfo.location
        if (warehouseInfo.name != undefined) warehouseDTO.name = warehouseInfo.name

        await warehouseRepository.save(WarehouseMap.toDomain(warehouseDTO))
    }

}