import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IAcceptProductUseCase {
    execute(productId: string, warehouseName: string, deliveryTicketHandler: IDeliveryTicketHandler, paymentHanlder: IPaymentHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository, counterOffer?: number): Promise<void>
}