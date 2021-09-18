import { IStockInfoDTO } from "../../DTOs/IStockInfoDTO";
import { IGetStockInfoUseCase } from "./IGetSockInfoUseCase";
import { IWarehouseRepository } from "../../../application/interfaces/repository/IWarehouseRepository";
import { Warehouse } from "../../../domain/entity/Warehouse";

export class GetStockInfoUseCase  implements IGetStockInfoUseCase {
    private _entrepotRepository: IWarehouseRepository

    constructor(entrepotRepository: IWarehouseRepository) {
        this._entrepotRepository = entrepotRepository
    }

    public async execute(productInfo: unknown): Promise<IStockInfoDTO> {
        try {
            throw new Error("Not implemented methods.")
        } catch(error) {
            throw error
        }
    }
}