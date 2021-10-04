import {IProductPriceRepository} from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IGeneratorIdHandler } from "../../interfaces/services/IGeneratorIdHandler";

export interface IAddProductUseCase {
    execute(warehouseName: string, productInfo: unknown, idGenerator: IGeneratorIdHandler,productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository, productPriceRepository: IProductPriceRepository): Promise<void>
}
