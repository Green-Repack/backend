import {IAddress} from "../../../../domain/interface/common/IAddress";

export interface IAcceptProduct{
    execute(productId: string, userId: string, warehouseAddress: IAddress): Promise<string>
}
