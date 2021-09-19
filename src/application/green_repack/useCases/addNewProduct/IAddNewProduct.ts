import {IProductDTO} from "../../../user/dto/IProductDTO";

export interface IAddNewProduct{
    execute(productDTO: IProductDTO, userRole: string, userId: string): Promise<void>;
}
