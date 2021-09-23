import { Produit } from "../../../domain/entity/Produit";
import { Warehouse } from "../../../domain/entity/Warehouse";
import { IStockInfo } from "../../../domain/entityProperties/IStockInfo";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IWarehouseRepository extends IBaseRepository<Warehouse> {
    getWarehouses(): Promise<Warehouse[]>
    getWarehouseById(id: string): Promise<Warehouse | undefined>
    getWarehouseByName(name: string): Promise<Warehouse | undefined>
    getWarehouseByLocation(location: string): Promise<Warehouse | undefined>
    getStockProduct(category: string, brand: string, model: string, warehouseName?: string): Promise<IStockInfo>
    saveProduct(product: Produit, wharehouseId?: string, warehouseName?: string): Promise<void>
    updateStockProduct(product: Produit, wharehouseId: string, quantity?: number): Promise<void>
}