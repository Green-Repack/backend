import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IDeleteWarehouseUseCase {
    execute(warehouseId: string, warehouseRepository: IWarehouseRepository): Promise<void>
}