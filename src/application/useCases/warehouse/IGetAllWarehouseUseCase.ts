import { IWarehouseDTO } from "../../DTOs/IWarehouseDTO";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IGetAllWarehouseUseCase {
    execute(warehouseRepository: IWarehouseRepository): Promise<IWarehouseDTO[]>
}