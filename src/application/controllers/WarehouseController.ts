import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { CreateWarehouseUseCase } from "../useCases/green_repack/CreateWarehouseUseCase";
import { GetAllWarehouseUseCase } from "../useCases/green_repack/GetAllWarehouseUseCase";
import { GetStockInfoUseCase } from "../useCases/green_repack/GetStockInfoUseCase";
import { GetWarehouseInfoUseCase } from "../useCases/green_repack/GetWarehouseInfoUseCase";

@injectable()
export class WarehouseController {
    private readonly _getStockInfoUseCase = new GetStockInfoUseCase;
    private readonly _getAllWarehouseUseCase = new GetAllWarehouseUseCase;
    private readonly _createWarehouseUseCase = new CreateWarehouseUseCase;
    private readonly _getWarehouseInfoUseCase = new GetWarehouseInfoUseCase
    

    @inject(TYPES.IWarehouseRepository)
    private _warehouseRepository: IWarehouseRepository;

    public constructor() {
        autoBind(this);
    }

    public async createWarehouse(req: any, res: any) {
        try {
            let warehouseDTO = await this._createWarehouseUseCase.execute(req.body, this._warehouseRepository)
            res.status(201).json(warehouseDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getInfo(req: any, res: any) {
        try {
            const {warehouseName} = req.body
            let warehouseDTO = await this._getWarehouseInfoUseCase.execute(warehouseName, this._warehouseRepository)
            res.status(201).json(warehouseDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfo(req: any, res: any) {
        try {
            let stockInfo = await this._getStockInfoUseCase.execute(req.body, this._warehouseRepository)
            res.status(200).json(stockInfo);
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