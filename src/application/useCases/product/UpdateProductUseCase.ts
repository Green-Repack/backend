import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { IProductPriceRepository } from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { PurchasePromiseStatus } from "../../user/enum/PurchasePromiseStatus";
import { IUpdateProductUseCase } from "./IUpdateProductUseCase";

export class UpdateProductUseCase implements IUpdateProductUseCase {
    async execute(productInfo: any, productId: string,productRepository: IProductRepository, productPriceRepository: IProductPriceRepository, userId: string, admin: boolean): Promise<void> {
        let product = await productRepository.getProductById(productId)
        
        if(!product) throw new NotFoundError("Product doesn't exist !")

        Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
        Guard.AgainstNullOrUndefined(productInfo.category, "Category is required")
        Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")
        Guard.AgainstNullOrUndefined(productInfo.state, "State is required")
        Guard.AgainstNullOrUndefined(productInfo.brand, "Brand is required")
        Guard.AgainstNullOrUndefined(productInfo.weight, "Weight is required")
        
        let productPrice = await productPriceRepository.getByCategoryAndState(productInfo.category, productInfo.state)
        
        let newProductDto: IProductDTO = {
            id: productId,
            name: productInfo.name,
            category: productInfo.category,
            brand: productInfo.brand,
            model: productInfo.model,
            specificities: productInfo.specificities,
            status: product.status,
            state: productInfo.state,
            price: productPrice.price,
            priceSeller: productPrice.price*1.3,
            images: productInfo.images,
            merchantId: product.merchantId,
            warehouseId: productInfo.warehouseId,
            accepted: product.accepted,
            creationDate: product.creationDate,
            weight: productInfo.weight,
        }

        if(userId!=product.merchantId && !admin
            && !(product.status==PurchasePromiseStatus.WaitingForApproval || product.status!=PurchasePromiseStatus.OrderBeingPrepared)){
                throw new UnauthorizedError("You are not authorized to update this product")
            }

        await productRepository.save(ProductMap.toDomain(newProductDto))
    }
}