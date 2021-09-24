import { Warehouse } from "../../domain/entity/Warehouse"
import { IWarehouseDTO } from "../DTOs/IWarehouseDTO"

export class WarehouseMap {
    public static toDTO(wareHouse: Warehouse): IWarehouseDTO {
        return {
            id: wareHouse.id,
            location: wareHouse.location,
            name: wareHouse.name,
            stock: wareHouse.stock
        }
    }

    public static toDomain(wareHouse: any): Warehouse {
        return Warehouse.createEntrepot({
            location: wareHouse.location,
            name: wareHouse.name,
            stock: wareHouse.stock
        }, wareHouse.id)
    }

    public static toPersistence(wareHouse: Warehouse): any {
        return {
            id: wareHouse.id,
            location: wareHouse.location,
            name: wareHouse.name,
            stock: wareHouse.stock
        }
    }
}