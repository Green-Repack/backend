import {IAcceptProduct} from "./IAcceptProduct";
import {PurchasePromiseStatus} from "../../../user/enum/PurchasePromiseStatus";
import {IAddress} from "../../../../domain/interface/common/IAddress";

export class AcceptProduct implements IAcceptProduct{
    async execute(productId: string, userId: string, address: IAddress): Promise<boolean> {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError("User not found error")

        let product = await Product.findById(productId);
        if (!product) throw new NotFoundError("Product not found error")

        product.accepte = true
        produit.status = PurchasePromiseStatus.OrderBeingPrepared

        let pdfLink = this.productService.
    }
}