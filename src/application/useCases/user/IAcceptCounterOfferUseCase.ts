import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IAcceptCounterOfferUseCase {
    execute(productId: string, paymentHandler: IPaymentHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void>
}