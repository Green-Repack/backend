import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository"
import { IDeleteWarehouseUseCase } from "./IDeleWarehouseUseCase"

export class DeleteWarehouseUseCase implements IDeleteWarehouseUseCase {
    async execute(warehouseId: string, warehouseRepository: IWarehouseRepository): Promise<void> {
        let warehouse = await warehouseRepository.getWarehouseById(warehouseId)
        if(!warehouse) throw new NotFoundError("Warehouse not found")
        await warehouseRepository.delete(warehouse)
    }
}