import { IStockInfo } from "../../../domain/entityProperties/IStockInfo";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IGetStockInfoUseCase {
    execute(warehouseName: string, productInfo: unknown, warehouseRepository: IWarehouseRepository): Promise<IStockInfo>
}