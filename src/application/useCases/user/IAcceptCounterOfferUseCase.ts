import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IPushNotifHandler } from "../../interfaces/services/IPushNotifHandler";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export interface IAcceptCounterOfferUseCase {
    execute(productId: string, stripeHandler: IStripeHandler, pushNotifHandler: IPushNotifHandler,
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void>
}