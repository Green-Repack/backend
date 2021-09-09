import {IAddNewProduct} from "./IAddNewProduct";
import {IProductDTO} from "../../../user/dto/IProductDTO";
import {Role} from "../../../user/enum/Role";
import {Product} from "../../../../domain/entity/Product";
import {PurchasePromiseStatus} from "../../../user/enum/PurchasePromiseStatus";
import {IProductPriceRepository} from "../../../../domain/interface/product/productData/IProductPriceRepository";

export class AddNewProduct implements IAddNewProduct {
    private _productPriceRepository: IProductPriceRepository


    constructor(productPriceRepository: IProductPriceRepository) {
        this._productPriceRepository = productPriceRepository;
    }

    async execute(productDTO: IProductDTO, userRole: string, userId: string): Promise<Product> {
        if(userRole.toLowerCase()!== Role.Company.toString().toLowerCase()) throw new UnauthorizedError("You don't have the right to create a product.")

        let category = productDTO.category.toString()
        let state = productDTO.state.toString()

        let productDataPrice = await this._productPriceRepository.getByCategoryAndState(category, state)

        let newProduct = new Product({
            name: productDTO.name,
            creatorId: userId,
            category: category,
            initialPrice: productDataPrice.price,
            photos: productDTO.photos,
            status: PurchasePromiseStatus.WaitingForApproval,
            state: state,
            accepted: false,
            specificities: {
                brand: productDTO.specificities.brand,
                description: productDTO.specificities.description,
                technicalSpec: productDTO.specificities.technicalSpec,
            },
            weight: productDTO.weight
        })

        try{
            return newProduct.save()
        }catch(e){
            throw new Error("Couldn't save the product. Try later.")
        }
    }
}
