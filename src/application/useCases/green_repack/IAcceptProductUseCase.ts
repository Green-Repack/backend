import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export interface IAcceptProductUseCase {
    execute(productId: string, warehouseName: string, stripeHandler: IStripeHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void>
}