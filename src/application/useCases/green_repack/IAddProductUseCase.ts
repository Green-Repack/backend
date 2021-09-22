import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IAddProductUseCase {
    execute(warehouseName: string, productInfo: unknown, productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository): Promise<void>
}