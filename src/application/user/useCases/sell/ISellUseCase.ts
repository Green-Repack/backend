import { IProductDTO } from "../../dto/IProductDTO";

export interface ISellUseCase {
    execute(userId: string, product: IProductDTO): void
}