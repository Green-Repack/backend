import { ShippingLabelRepository } from "../../../infrastructure/persistence/repositories/ShippingLabelRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IAcceptProductUseCase {
    execute(productId: string, warehouseName: string, paymentHanlder: IPaymentHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository, shippingLabelRepository: ShippingLabelRepository): Promise<void>
}