import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";

export interface IAcceptEstimationUseCase {
    execute(produitId: string, deliveryHandler: IDeliveryTicketHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<void>
}