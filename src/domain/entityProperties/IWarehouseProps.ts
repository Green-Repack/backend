import {IAddress} from "./IAddress";
import { IStockInfo } from "./IStockInfo";

export interface IWarehouseProps {
    location: IAddress
    name: string
    stock: IStockInfo[]
}