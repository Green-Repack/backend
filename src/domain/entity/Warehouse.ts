import { IWarehouseProps } from "../entityProperties/IWarehouseProps";
import { Entity } from "./BaseEntity";
import { IStockInfo } from "../entityProperties/IStockInfo";

export class Warehouse extends Entity<IWarehouseProps> {
    get id(): string {
        return this._id!
    }
    
    get name(): string {
        return this.props.name
    }

    get location(): string {
        return this.props.location
    }

    get stock(): IStockInfo[] {
        return this.props.stock
    }

    private constructor(props: IWarehouseProps, id?: string) {
        super(props, id)
    }

    public static createEntrepot(props: IWarehouseProps, id?: string): Warehouse {
        const instance = new Warehouse(props, id)
        return instance
    }
}