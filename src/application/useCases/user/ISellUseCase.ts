import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";

export interface ISellUseCase {
    execute(userId: string, productInfo: unknown, deliveryHandler: IDeliveryTicketHandler,
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<number>
}