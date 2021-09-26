import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IAddProductUseCase } from "./IAddProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { IProductPriceRepository } from "../../interfaces/repository/IProductPriceRepository";

export class AddProductUseCase implements IAddProductUseCase {
    async execute(warehouseName: string, productInfo: any, productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository, productPriceRepository: IProductPriceRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(warehouseName, "WarehouseName is required")
            Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(productInfo.category, "Mategory is required")
            Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")
            Guard.AgainstNullOrUndefined(productInfo.status, "Status is required")
            Guard.AgainstNullOrUndefined(productInfo.state, "State is required")
            Guard.AgainstNullOrUndefined(productInfo.brand, "Brand is required")
            Guard.AgainstNullOrUndefined(productInfo.weight, "Weight is required")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let productPrice = await productPriceRepository.getByCategoryAndState(productInfo.category, productInfo.state)

            let productDTO: IProductDTO = {
                name: productInfo.name,
                category: productInfo.category,
                brand: productInfo.brand,
                model: productInfo.model,
                specificities: productInfo.specificities,
                images: productInfo.images,
                state: productInfo.state,
                status: productInfo.status,
                weight: productInfo.weight,
                price: productPrice.price,
                creationDate: new Date()
            }

            let product = ProductMap.toDomain(productDTO)
            await productRepository.save(product)
            await warehouseRepository.updateStockProduct(product, warehouse.id)
        } catch(error) {
            throw error
        }
    }
    
}