import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { GetAllWarehouseUseCase } from "../useCases/green_repack/GetAllWarehouseUseCase";
import { GetStockInfoUseCase } from "../useCases/green_repack/GetStockInfoUseCase";

@injectable()
export class WarehouseController {
    private readonly _getStockInfoUseCase = new GetStockInfoUseCase;
    private readonly _getAllWarehouseUseCase = new GetAllWarehouseUseCase;

    @inject(TYPES.IWarehouseRepository)
    private _warehouseRepository: IWarehouseRepository;

    public constructor() {
        autoBind(this);
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

    public async getAllWarehouses(req: any, res: any) {
        try {
            let warehouses = await this._getAllWarehouseUseCase.execute(this._warehouseRepository)
            res.status(200).json(warehouses)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}