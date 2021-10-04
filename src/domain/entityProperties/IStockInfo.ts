import { EProductCategory } from "./EProductCategory";

export interface IStockInfo {
    category: EProductCategory
    brand: string
    model: string
    year: number
    quantityAvailable: number
}