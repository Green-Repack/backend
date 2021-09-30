import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IUpdateWarehouseUseCase {
    execute(warehouseInfo: unknown, warehouseId: string, warehouseRepository: IWarehouseRepository): Promise<void>
}