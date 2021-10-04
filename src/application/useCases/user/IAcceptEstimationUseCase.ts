import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";

export interface IAcceptEstimationUseCase {
    execute(produitId: string, warehouseName: string, deliveryHandler: IDeliveryTicketHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void>
}