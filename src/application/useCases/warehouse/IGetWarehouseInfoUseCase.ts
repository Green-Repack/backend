import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IGetWarehouseInfoUseCase {
    execute(warehouseName: string, warehouseRepository: IWarehouseRepository): Promise<IWarehouseDTO>
}