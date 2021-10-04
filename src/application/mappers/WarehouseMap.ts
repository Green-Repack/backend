import { Warehouse } from "../../domain/entity/Warehouse"
import { IWarehouseDTO } from "../DTOs/IWarehouseDTO"

export class WarehouseMap {
    public static toDTO(warehourse: Warehouse): IWarehouseDTO {
        return {
            id: warehourse.id,
            location: warehourse.location,
            name: warehourse.name,
            stock: warehourse.stock
        }
    }

    public static toDomain(warehourse: any): Warehouse {
        return Warehouse.createEntrepot({
            location: warehourse.location,
            name: warehourse.name,
            stock: warehourse.stock
        }, warehourse.id)
    }

    public static toPersistence(warehourse: Warehouse): any {
        return {
            id: warehourse.id,
            location: warehourse.location,
            name: warehourse.name,
            stock: warehourse.stock
        }
    }
}