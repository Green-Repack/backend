import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IMakeCounterOfferUseCase {
    execute(productId: string, counterOffer: number, deliveryHandler: IDeliveryTicketHandler, paymentHanlder: IPaymentHandler, 
        warehouseName: string, warehouseRepository: IWarehouseRepository, productRepository: IProductRepository, 
        userRepository: IUserRepository): Promise<void>
}