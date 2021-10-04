import { Guard } from "../../commons/Guard";
import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { NotFoundError } from "../../errors/NotFoundError";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { WarehouseMap } from "../../mappers/WarehouseMap";
import { IGetWarehouseInfoUseCase } from "./IGetWarehouseInfoUseCase";

export class GetWarehouseInfoUseCase implements IGetWarehouseInfoUseCase {
    async execute(warehouseName: string, warehouseRepository: IWarehouseRepository): Promise<IWarehouseDTO> {
        try {
            Guard.AgainstNullOrUndefined(warehouseName, "Warehouse's name is required")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let warehouseDTO = WarehouseMap.toDTO(warehouse)
            return warehouseDTO
        } catch(error) {
            throw error
        }
    }
    
}