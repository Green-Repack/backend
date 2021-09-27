import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IAddProductUseCase } from "./IAddProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";

export class AddProductUseCase implements IAddProductUseCase {
    async execute(warehouseName: string, productInfo: any, productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(warehouseName, "WarehouseName is required")
            Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(productInfo.category, "Mategory is required")
            Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")
            Guard.AgainstNullOrUndefined(productInfo.price, "Price is required")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let productDTO: IProductDTO = {
                name: productInfo.name,
                category: productInfo.category,
                brand: productInfo.brand,
                model: productInfo.model,
                sellingStatus: EPurchasePromiseStatus.Accepted,
                state: productInfo.state,
                specificities: productInfo.specificities,
                images: productInfo.images,
                warehouseId: warehouse.id,
                price: productInfo.price,
                sold: false,
                creationDate: new Date(),
                weight: productInfo.weight,
                year: productInfo.year
            }

            let product = ProductMap.toDomain(productDTO)
            await productRepository.save(product)
            await warehouseRepository.updateStockProduct(product, false)
        } catch(error) {
            throw error
        }
    }
    
}