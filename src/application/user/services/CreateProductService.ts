import {Product} from "../../../domain/entity/Product";
import {Guard} from "../../commons/Guard";
import {IProductDTO} from "../dto/IProductDTO";
import {PurchasePromiseStatus} from "../enum/PurchasePromiseStatus";

export class CreateProductService {
    public static async create(productDTO: IProductDTO, creatorId: string, price: number): Promise<Product> {
        Guard.AgainstNullOrUndefined(productDTO.name, "product name required !");
        Guard.AgainstNullOrUndefined(productDTO.category, "product category required !");
        Guard.AgainstNullOrUndefined(productDTO.state, "product state required !");
        Guard.AgainstNullOrUndefined(productDTO.weight, "product weight required !");
        Guard.AgainstNullOrUndefined(productDTO.specificities.description, "product description required !");
        Guard.AgainstNullOrUndefined(productDTO.specificities.brand, "product brand required !");

        productDTO.creatorId = creatorId;
        productDTO.initialPrice = price;
        productDTO.status = PurchasePromiseStatus.WaitingForApproval;
        productDTO.accepted = false;

        let newProduct = ProductMap.toDomain(productDTO);

        return newProduct;
    }
}
