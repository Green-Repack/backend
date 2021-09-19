import {Repository} from "../../Repository";
import {IProductPriceProps} from "./IProductPriceProps";

export interface IProductPriceRepository extends Repository<IProductPriceProps>{
    getByCategory(category: string): Promise<IProductPriceProps[]>
    getByCategoryAndState(category: string, state: string): Promise<IProductPriceProps | null>
}
