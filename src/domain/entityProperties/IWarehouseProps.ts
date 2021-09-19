import { IProduitProps } from "../entityProperties/IProduitProps";

export interface IWarehouseProps {
    location: string
    name: string
    stock: IProduitProps[]
}