import { IGetStockInfoUseCase } from "./IGetSockInfoUseCase";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { ArgumentNullError } from "../../errors/ArgumentNullError";
import { IStockInfo } from "../../../domain/entityProperties/IStockInfo";
import { Guard } from "../../commons/Guard";

export class GetStockInfoUseCase  implements IGetStockInfoUseCase {
    public async execute(warehouseName: string, productInfo: any, warehouseRepository: IWarehouseRepository): Promise<IStockInfo> {
        try {
            Guard.AgainstNullOrUndefined(productInfo.category, "categry required")
            Guard.AgainstNullOrUndefined(productInfo.brand, "brand required")
            Guard.AgainstNullOrUndefined(productInfo.model, "model required")
            
            let stockInfo = null
            if (warehouseName != undefined) {
                stockInfo = await warehouseRepository.getStockProduct(productInfo.category, productInfo.brand, productInfo.model, warehouseName)
            } else {
                stockInfo = await warehouseRepository.getStockProduct(productInfo.category, productInfo.brand, productInfo.model)
            }
            return stockInfo
        } catch(error) {
            throw error
        }
    }
}