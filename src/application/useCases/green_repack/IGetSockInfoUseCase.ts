import { IStockInfoDTO } from "../../DTOs/IStockInfoDTO";

export interface IGetStockInfoUseCase {
    execute(productInfo: unknown): Promise<IStockInfoDTO>
}