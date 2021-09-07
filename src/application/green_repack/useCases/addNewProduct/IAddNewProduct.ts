import {IProductDTO} from "../../../user/dto/IProductDTO";
import {Product} from "../../../../domain/entity/Product";

export interface IAddNewProduct{
    execute(newProduct: IProductDTO, userRole: string): Product
}