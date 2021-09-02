import { IProduitDTO } from "../../dto/IProduitDTO";

export interface ISellUseCase {
    execute(userId: string, product: IProduitDTO): void
}