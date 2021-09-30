import { IAddress } from "../../domain/entityProperties/IAddress";
import { IStockInfo } from "../../domain/entityProperties/IStockInfo";

export interface IWarehouseDTO {
    id?: string
    location: IAddress
    name: string
    stock: IStockInfo[]
}