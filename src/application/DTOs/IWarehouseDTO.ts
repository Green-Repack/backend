import { IProduitProps } from "../../domain/entityProperties/IProduitProps";

export interface IWarehouseDTO {
    id?: string
    location: string
    name: string
    stock: IProduitProps[]
}