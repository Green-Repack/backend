import { IProduitDTO } from "../../dto/IProduitDTO";

export interface IBuyUseCase {
    execute(userId: string, panier: IProduitDTO): void 
}