import { IProductPriceRepository } from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IAddProductUseCase {
    execute(warehouseName: string, productInfo: unknown, productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository, productPriceRepository: IProductPriceRepository): Promise<void>
}