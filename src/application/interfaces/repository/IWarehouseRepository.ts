import { Product } from "../../../domain/entity/Product";
import { Warehouse } from "../../../domain/entity/Warehouse";
import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { IStockInfo } from "../../../domain/entityProperties/IStockInfo";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IWarehouseRepository extends IBaseRepository<Warehouse> {
    getAllWarehouses(): Promise<Warehouse[]>
    getWarehouseById(id: string): Promise<Warehouse | undefined>
    getWarehouseByName(name: string): Promise<Warehouse | undefined>
    getWarehouseByLocation(location: string): Promise<Warehouse | undefined>
    getStockProduct(category: EProductCategory, brand: string, model: string, year: number, warehouseName?: string): Promise<IStockInfo>
    updateStockProduct(product: Product, sell?: boolean): Promise<void>
}