import { Warehouse } from "../../../domain/entity/Warehouse";
import { NotFoundError } from "../../errors/NotFoundError";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IGetWarehouseUseCase } from "./IGetWarehouseUseCase";

export class GetWarehouseUseCase implements IGetWarehouseUseCase {
    async execute(warehouseId: string, warehouseRepository: IWarehouseRepository): Promise<Warehouse | null> {
        let warehouse = await warehouseRepository.getWarehouseById(warehouseId)
        if(!warehouse) throw new NotFoundError("Warehouse doesn't exist !")

        return warehouse
    }

}