import { IStockInfo } from "./IStockInfo";

export interface IWarehouseProps {
    location: string
    name: string
    stock: IStockInfo[]
}