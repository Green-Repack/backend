import {IAddNewProduct} from "./IAddNewProduct";
import {IProductDTO} from "../../../user/dto/IProductDTO";
import {Role} from "../../../user/enum/Role";
import {Product} from "../../../../domain/entity/Product";
import {PurchasePromiseState} from "../../../user/enum/PurchasePromiseState";

export class AddNewProduct implements IAddNewProduct {
    async execute(productDTO: IProductDTO, userRole: string, userId: string): Promise<Product> {
        if(userRole.toLowerCase()!== Role.Company.toString().toLowerCase()) throw new UnauthorizedError("You don't have the right to create a product.")

        let category = productDTO.category.toString()
        let state = productDTO.state.toString()

        let productDataPrice = await PriceData.find({productCategory: category, productState: state})

        let newProduct = new Product({
            name: productDTO.name,
            marchandId: userId,
            category: category,
            initialPrice: productDataPrice.price,
            photos: productDTO.photos,
            status: PurchasePromiseState.WaitingForApproval,
            state: state,
            accepte: false,
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
