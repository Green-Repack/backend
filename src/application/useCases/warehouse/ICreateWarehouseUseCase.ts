import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface ICreateWarehouseUseCase {
    execute(warehouseInfo: unknown, warehouseRepository: IWarehouseRepository): Promise<IWarehouseDTO>
}