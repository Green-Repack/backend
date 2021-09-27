import { Warehouse } from "../../../domain/entity/Warehouse";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IGetWarehouseUseCase {
    execute(warehouseId: string, warehouseRepository: IWarehouseRepository): Promise<Warehouse | null>
}