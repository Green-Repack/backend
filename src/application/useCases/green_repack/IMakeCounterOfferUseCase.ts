import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export interface IMakeCounterOfferUseCase {
    execute(productId: string, warehouseName: string, counterOffer: number, warehouseRepository: IWarehouseRepository, 
        productRepository: IProductRepository, userRepository: IUserRepository): Promise<IProductDTO>
}