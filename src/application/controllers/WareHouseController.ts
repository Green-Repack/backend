import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { GetStockInfoUseCase } from "../useCases/green_repack/GetStockInfoUseCase";
import { BaseController } from "./BaseController";

export class WareHouseController extends BaseController {
    private readonly _getStockInfoUseCase = new GetStockInfoUseCase;

    private _warehouseRepository: IWarehouseRepository;

    public constructor(warehouseRepository: IWarehouseRepository) {
        super();
        this._warehouseRepository = warehouseRepository
        
    }

    public async getStockInfo(req: any, res: any) {
        try {
            const {warehouseName, productInfo} = req.body
            let stockInfo = await this._getStockInfoUseCase.execute(warehouseName, productInfo, this._warehouseRepository)
            res.status(200).json(stockInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}