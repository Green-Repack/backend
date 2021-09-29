import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IGeneratorIdHandler } from "../../interfaces/services/IGeneratorIdHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IBuyUseCase {
    execute(userId: string, itemBucket: any, paymentHandler: IPaymentHandler, idGenerator: IGeneratorIdHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository, promoCoinsRepository: IPromoCoinsRepository): Promise<string>
}