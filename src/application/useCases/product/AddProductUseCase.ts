import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IAddProductUseCase } from "./IAddProductUseCase";
import { IProductPriceRepository } from "../../interfaces/repository/IProductPriceRepository";
import { Product } from "../../../domain/entity/Product";
import { PurchasePromiseStatus } from "../../user/enum/PurchasePromiseStatus";
import { ProductState } from "../../user/enum/ProductState";
import { ProductCategory } from "../../user/enum/ProductCategory";

export class AddProductUseCase implements IAddProductUseCase {
    async execute(productInfo: any, productRepository: IProductRepository, productPriceRepository: IProductPriceRepository, creatorId: string): Promise<Product> {
        try {
            Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(productInfo.category, "Category is required")
            Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")
            Guard.AgainstNullOrUndefined(productInfo.state, "State is required")
            Guard.AgainstNullOrUndefined(productInfo.brand, "Brand is required")
            Guard.AgainstNullOrUndefined(productInfo.weight, "Weight is required")

            let productPrice = await productPriceRepository.getByCategoryAndState(productInfo.category, productInfo.state)
            
            console.log(productPrice)

            let productDTO: IProductDTO = {
                name: productInfo.name,
                category: ProductCategory[productInfo.category],
                brand: productInfo.brand.toLowerCase(),
                model: productInfo.model.toLowerCase(),
                specificities: productInfo.specificities,
                images: productInfo.images,
                state: ProductState[productInfo.state],
                status: PurchasePromiseStatus.WaitingForApproval,
                weight: productInfo.weight,
                price: productPrice.price,
                priceSeller: productPrice.price*1.3,
                merchantId: creatorId,
                creationDate: new Date()
            }

            let product = ProductMap.toDomain(productDTO)
            await productRepository.save(product)
            return product
        } catch(error) {
            console.log(error)
            throw new Error("Cant't create the product.")
        }
    }
}