import { Produit } from "../../../domain/entity/Produit";
import { Warehouse } from "../../../domain/entity/Warehouse";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IWarehouseRepository extends IBaseRepository<Warehouse> {
    getWarehouseByName(name: string): Promise<Warehouse | undefined>
    getWarehouseByLocation(location: string): Promise<Warehouse | undefined>
    getStockByProductCategory(category: string, warehouseName?: string): Promise<Warehouse[]>
    getStockByProductModel(model: string, brand: string, warehouseName?: string): Promise<Warehouse[]>
    getStockByProductBrand(brand: string, warehouseName?: string): Promise<Warehouse[]>
    saveProduct(product: Produit, warehouseName: string): Promise<void>
    deleteProduct(product: Produit, warehouseName: string): Promise<void>
}