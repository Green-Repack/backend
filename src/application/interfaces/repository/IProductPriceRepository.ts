import { ProductPrice } from "../../../domain/entity/ProductPrice";
import { IProductPriceProps } from "../../../domain/entityProperties/IProductPriceProps";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IProductPriceRepository extends IBaseRepository<ProductPrice>{
    getByCategory(category: string): Promise<IProductPriceProps[]>
    getByCategoryAndState(category: string, state: string): Promise<IProductPriceProps | null>

}