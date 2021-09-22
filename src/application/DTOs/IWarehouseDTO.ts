import { IStockInfo } from "../../domain/entityProperties/IStockInfo";

export interface IWarehouseDTO {
    id?: string
    location: string
    name: string
    stock: IStockInfo[]
}