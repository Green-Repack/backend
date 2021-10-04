import { WarehouseMap } from "../../../application/mappers/WarehouseMap";
import { Warehouse } from "../../../domain/entity/Warehouse";
import { IWarehouseRepository } from "../../../application/interfaces/repository/IWarehouseRepository";
import { WarehouseModel } from "../schemas/Warehouse";
import { Product } from "../../../domain/entity/Product";
import { IStockInfo } from "../../../domain/entityProperties/IStockInfo";
import { injectable } from "inversify";
import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";

@injectable()
export class WarehouseRepository implements IWarehouseRepository {
    async getWarehouseById(id: string): Promise<Warehouse | undefined> {
        let warehouse = await WarehouseModel.findById(id)
        if (warehouse) return WarehouseMap.toDomain(warehouse)
        else return undefined
    }

    async getAllWarehouses(): Promise<Warehouse[]> {
        let result = new Array<Warehouse>()
        let warehouses = await WarehouseModel.find({})
        for (var warehouse of warehouses) {
            result.push(WarehouseMap.toDomain(warehouse))
        }
        return result
    }

    async getStockProduct(category: EProductCategory, brand: string, model: string, year: number, warehouseName?: string): Promise<IStockInfo> {
        let quantityAvailable: number = 0
        if (warehouseName == undefined) {
            let warehouses = await WarehouseModel.find({})
            .select({ stock: { $elemMatch : { category: category, brand: brand, model: model, year: year}}})
            for (var warehouse of warehouses) {
                let stockInfo =  WarehouseMap.toDomain(warehouse).stock.pop()
                if (stockInfo != undefined) quantityAvailable += stockInfo.quantityAvailable
            }
            return {
                category: category,
                brand: brand,
                model: model,
                year: year,
                quantityAvailable: quantityAvailable
            }
        } else {
            let stock = await WarehouseModel.findOne({ name: warehouseName.toLowerCase() })
            .select({ stock: { $elemMatch : { category: category, brand: brand, model: model, year: year}}})
            let stockInfo = WarehouseMap.toDomain(stock).stock.pop()
            if (stockInfo != undefined) quantityAvailable = stockInfo.quantityAvailable
            return {
                category: category,
                brand: brand,
                model: model,
                year: year,
                quantityAvailable: quantityAvailable
            }
        }
    }

    async updateStockProduct(product: Product, sell?: boolean): Promise<void> {
        let warehouse = await WarehouseModel.findById(product.warehouseId)
        let productInStock = await WarehouseModel.findOne({name: warehouse.name.toLowerCase(), 
            "stock.category": product.category,
            "stock.brand": product.brand,
            "stock.model": product.model})
        if (productInStock) {
            if (sell!) {
                await WarehouseModel.updateOne(
                    {name: warehouse.name.toLowerCase(), 
                    "stock.category": product.category,
                    "stock.brand": product.brand,
                    "stock.model": product.model},
                {$inc: {"stock.$.quantityAvailable": -1}})
            } else {
                await WarehouseModel.updateOne(
                    {name: warehouse.name.toLowerCase(), 
                    "stock.category": product.category,
                    "stock.brand": product.brand,
                    "stock.model": product.model},
                {$inc: {"stock.$.quantityAvailable": 1}})
            }
        } else {
            let stockInfo: IStockInfo = {
                category: product.category,
                brand: product.brand,
                model: product.model,
                year: product.year,
                quantityAvailable: 1
            }
            await WarehouseModel.updateOne({name: warehouse.name.toLowerCase()},
                {$push : {"stock": stockInfo}})
        }
    }

    async getWarehouseByName(name: string): Promise<Warehouse | undefined> {
        let Warehouse = await WarehouseModel.findOne({name: name.toLowerCase()})
        if (Warehouse != null) return WarehouseMap.toDomain(Warehouse)
        else return undefined
    }

    async getWarehouseByLocation(location: string): Promise<Warehouse | undefined> {
        let Warehouse = await WarehouseModel.findOne({locaton: location.toLowerCase()})
        if (Warehouse != null) return WarehouseMap.toDomain(Warehouse)
        else return undefined
    }

    async exists(idOrName: string): Promise<boolean> {
        let nameResult = await WarehouseModel.findOne({name: idOrName.toLowerCase()})
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
        await WarehouseModel.deleteOne({name: Warehouse.name.toLowerCase()})
    }

    async save(Warehouse: Warehouse): Promise<void> {
        let exists = await this.exists(Warehouse.name.toLowerCase())
        const rawWarehouseData = WarehouseMap.toPersistence(Warehouse)

        if (exists) {
            const mongooseUser = await WarehouseModel.findOne({name: Warehouse.name.toLowerCase()})
            if (mongooseUser) await mongooseUser.updateOne(rawWarehouseData)
        } else {
            await WarehouseModel.create(rawWarehouseData)
        }
    }
}