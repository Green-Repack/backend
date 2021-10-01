import {IProductPriceRepository} from "../../application/interfaces/repository/IProductPriceRepository";
import {ProductPrice} from "../../domain/entity/ProductPrice";

export class ProductPriceService {

    static async getProductPrice(category: string, state: string, year: number,productPriceRepository: IProductPriceRepository): Promise<number>{
        let productPrice: ProductPrice = await productPriceRepository.getByCategoryAndState(category, state);

        let age = new Date().getFullYear()-year;

        if(age<=1) return productPrice.price/1.2;
        else if(age<=3 && age>1) return Number.parseFloat((productPrice.price/(1.2)).toFixed(2))
        else if(age<=5 && age>3) return Number.parseFloat((productPrice.price/(1.5)).toFixed(2))
        else if(age<=10 && age>5) return Number.parseFloat((productPrice.price/(1.75)).toFixed(2))
        else if(age<=10 && age>5) return Number.parseFloat((productPrice.price/(2.5)).toFixed(2))
        else if(age>10) return Number.parseFloat((productPrice.price/(5)).toFixed(2))
    }
}
