import { NotFoundError } from "../../errors/NotFoundError";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import {IDeleteWarehouseUseCase} from "./IDeleteWarehouseUseCase";

export class DeleteWarehouseUseCase implements IDeleteWarehouseUseCase {
    async execute(warehouseId: string, warehouseRepository: IWarehouseRepository): Promise<void> {
        let warehouse = await warehouseRepository.getWarehouseById(warehouseId)
        if(!warehouse) throw new NotFoundError("Warehouse doesn't exist !")
        await warehouseRepository.delete(warehouse)
    }
}