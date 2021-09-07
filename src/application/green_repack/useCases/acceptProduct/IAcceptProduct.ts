import {ProductServices} from "../../services/ProductServices";

export interface IAcceptProduct{
    productService: ProductServices

    execute(productId: string, userId: string): Promise<boolean>
}