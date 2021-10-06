import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO"
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository"
import { WarehouseMap } from "../../mappers/WarehouseMap"
import { IUpdateWarehouseUseCase } from "./IUpdateWarehouseUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class UpdateWarehouseUseCase implements IUpdateWarehouseUseCase{
    async execute(warehouseInfo: any, warehouseId: string,warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            let warehouse = await warehouseRepository.getWarehouseById(warehouseId)
            if(!warehouse) throw new NotFoundError("Warehouse doesn't exist !")

            let warehouseDTO: IWarehouseDTO = WarehouseMap.toDTO(warehouse)
            if (warehouseInfo.location != undefined) warehouseDTO.location = warehouseInfo.location
            if (warehouseInfo.name != undefined) warehouseDTO.name = warehouseInfo.name

            await warehouseRepository.save(WarehouseMap.toDomain(warehouseDTO))
        } catch(error) {
            throw error
        }
    }

}