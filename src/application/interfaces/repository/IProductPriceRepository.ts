import {ProductPrice} from "../../../domain/entity/ProductPrice";
import {IBaseRepository} from "./IBaseRepositoty";

export interface IProductPriceRepository extends IBaseRepository<ProductPrice>{
    getByCategory(category: string): Promise<ProductPrice[]>
    getByCategoryAndState(category: string, state: string): Promise<ProductPrice | null>

}
