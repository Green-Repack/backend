import { WarehouseMap } from "../../../application/mappers/WarehouseMap";
import { Warehouse } from "../../../domain/entity/Warehouse";
import { IWarehouseRepository } from "../../../application/interfaces/repository/IWarehouseRepository";
import { WarehouseModel } from "../schemas/Warehouse";
import { Produit } from "../../../domain/entity/Produit";

export class WarehouseRepository implements IWarehouseRepository {
    saveProduct(product: Produit, warehouseName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(product: Produit, warehouseName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getWarehouseByName(name: string): Promise<Warehouse | undefined> {
        let Warehouse = await WarehouseModel.findOne({name: name.toString()})
        if (Warehouse != null) return WarehouseMap.toDomain(Warehouse)
        else return undefined
    }

    async getWarehouseByLocation(location: string): Promise<Warehouse | undefined> {
        let Warehouse = await WarehouseModel.findOne({locaton: location.toString()})
        if (Warehouse != null) return WarehouseMap.toDomain(Warehouse)
        else return undefined
    }

    async getStockByProductCategory(category: string, WarehouseName?: string): Promise<Warehouse[]> {
        let result: Warehouse[] = new Array<Warehouse>()
        let Warehouses

        if (WarehouseName! != undefined) {
            Warehouses = await WarehouseModel.find({name: WarehouseName!, 'stock.category': category})
        } else {
            Warehouses = await WarehouseModel.find({'stock.category': category})
        }
        for(var Warehouse of Warehouses) {
            result.push(WarehouseMap.toDomain(Warehouse))
        }
        return result
    }

    async getStockByProductModel(model: string, brand: string, WarehouseName?: string): Promise<Warehouse[]> {
        let result: Warehouse[] = new Array<Warehouse>()
        let Warehouses

        if (WarehouseName! != undefined) {
            Warehouses = await WarehouseModel.find({name: WarehouseName!, 'stock.brand': brand, 'stock.model': model})
        } else {
            Warehouses = await WarehouseModel.find({'stock.brand': brand, 'stock.model': model})
        }
        for(var Warehouse of Warehouses) {
            result.push(WarehouseMap.toDomain(Warehouse))
        }
        return result
    }

    async getStockByProductBrand(brand: string, WarehouseName?: string): Promise<Warehouse[]> {
        let result: Warehouse[] = new Array<Warehouse>()
        let Warehouses

        if (WarehouseName! != undefined) {
            Warehouses = await WarehouseModel.find({name: WarehouseName!, 'stock.brand': brand})
        } else {
            Warehouses = await WarehouseModel.find({'stock.brand': brand})
        }
        for(var Warehouse of Warehouses) {
            result.push(WarehouseMap.toDomain(Warehouse))
        }
        return result
    }

    async exists(idOrName: string): Promise<boolean> {
        let nameResult = await WarehouseModel.findOne({name: idOrName})
        if (nameResult == null) {
            try {
                let idResult = await WarehouseModel.findById(idOrName)
                if (idResult == null)  return false
                else return true
            } catch(error) {
                return false
            }
        } else {
            return true
        }
    }

    async delete(Warehouse: Warehouse): Promise<void> {
        await WarehouseModel.deleteOne({name: Warehouse.name})
    }

    async save(Warehouse: Warehouse): Promise<void> {
        let exists = await this.exists(Warehouse.name)
        const rawWarehouseData = WarehouseMap.toPersistence(Warehouse)

        if (exists) {
            const mongooseUser = await WarehouseModel.findOne({name: Warehouse.name.toLowerCase()})
            if (mongooseUser) await mongooseUser.updateOne(rawWarehouseData)
        } else {
            await WarehouseModel.create(rawWarehouseData)
        }
    }
}