import { IProductDTO } from "../../dto/IProductDTO";

export interface IBuyUseCase {
    execute(userId: string, panier: IProductDTO): void
}