import { IProduitProps } from "../../../domain/entityProperties/IProduitProps";
import { Guard } from "../../commons/Guard";
import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { WarehouseMap } from "../../mappers/WarehouseMap";
import { ICreateWarehouseUseCase } from "./ICreateWarehouseUseCase";

export class CreateWarehouseUseCase implements ICreateWarehouseUseCase {
    async execute(warehouseInfo: any, warehouseRepository: IWarehouseRepository): Promise<IWarehouseDTO> {
        try {
            Guard.AgainstNullOrUndefined(warehouseInfo.location, "location required")
            Guard.AgainstNullOrUndefined(warehouseInfo.name, "name required")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseInfo.name)
            if (warehouse != undefined) throw new AlreadyExistsError("The warehouse already exists")

            let warehouseDTO: IWarehouseDTO = {
                name: warehouseInfo.name,
                location: warehouseInfo.location,
                stock: new Array<IProduitProps>()
            }

            await warehouseRepository.save(WarehouseMap.toDomain(warehouseDTO))
            return warehouseDTO
        } catch (error) {
            throw error
        }
    }
    
}