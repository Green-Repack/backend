import {ProductPrice} from "../../../domain/entity/ProductPrice";
import {ProductPriceService} from "../../../infrastructure/services/ProductPriceService";
import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import {IProductPriceRepository} from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IAddProductUseCase } from "./IAddProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { IGeneratorIdHandler } from "../../interfaces/services/IGeneratorIdHandler";

export class AddProductUseCase implements IAddProductUseCase {
    async execute(warehouseName: string, productInfo: any, idGenerator: IGeneratorIdHandler, productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository, productPriceRepository: IProductPriceRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(warehouseName, "WarehouseName is required")
            Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(productInfo.category, "Category is required")
            Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")
            Guard.AgainstNullOrUndefined(productInfo.year, "Year is required")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let price: number = 0
            if(productInfo.price) price=productInfo.price
            else {
                price = await ProductPriceService.getProductPrice(productInfo.category, productInfo.state, productInfo.year, productPriceRepository);
            }

            let productId = idGenerator.generate()
            let productDTO: IProductDTO = {
                productId: productId,
                name: productInfo.name,
                category: productInfo.category,
                brand: productInfo.brand,
                model: productInfo.model,
                sellingStatus: EPurchasePromiseStatus.Accepted,
                state: productInfo.state,
                specificities: productInfo.specificities,
                images: productInfo.images,
                warehouseId: warehouse.id,
                price: Number.parseFloat(price.toFixed(2)),
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
