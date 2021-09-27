import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { WarehouseMap } from "../../mappers/WarehouseMap";
import { IGetAllWarehouseUseCase } from "./IGetAllWarehouseUseCase";

export class GetAllWarehouseUseCase implements IGetAllWarehouseUseCase {
    async execute(warehouseRepository: IWarehouseRepository): Promise<IWarehouseDTO[]> {
        let warehouses = await warehouseRepository.getAllWarehouses()
        let warehousesDTO: IWarehouseDTO[] = new Array<IWarehouseDTO>()
        for (var warehouse of warehouses) {
            warehousesDTO.push(WarehouseMap.toDTO(warehouse))
        }
        return warehousesDTO
    }
}