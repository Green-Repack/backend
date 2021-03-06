import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { CreateWarehouseUseCase } from "../useCases/warehouse/CreateWarehouseUseCase";
import { DeleteWarehouseUseCase } from "../useCases/warehouse/DeleteWarehouseUseCase";
import { GetAllWarehouseUseCase } from "../useCases/warehouse/GetAllWarehouseUseCase";
import { GetStockInfoUseCase } from "../useCases/warehouse/GetStockInfoUseCase";
import { GetWarehouseInfoUseCase } from "../useCases/warehouse/GetWarehouseInfoUseCase";
import { UpdateWarehouseUseCase } from "../useCases/warehouse/UpdateWarehouseUseCase";
import { NotFoundError } from "../errors/NotFoundError";

@injectable()
export class WarehouseController {
    private readonly _getStockInfoUseCase = new GetStockInfoUseCase;
    private readonly _getAllWarehouseUseCase = new GetAllWarehouseUseCase;
    private readonly _createWarehouseUseCase = new CreateWarehouseUseCase;
    private readonly _getWarehouseInfoUseCase = new GetWarehouseInfoUseCase;
    private readonly _deleteWarehouseUseCase = new DeleteWarehouseUseCase;
    private readonly _updateWarehouseUseCase = new UpdateWarehouseUseCase;
    

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
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteWarehouse(req: any, res: any) {
        try {
            await this._deleteWarehouseUseCase.execute(req.params.id, this._warehouseRepository)
            res.status(200).json("Deleted");
        } catch(error) {
            if(error instanceof NotFoundError){
                res.status(404).json({ error: error.message });
            }else{
                console.log(error)
                res.status(400).json({ error: error.message });
            }
        }
    }

    public async updateWarehouse(req: any, res: any) {
        try {
            await this._updateWarehouseUseCase.execute(req.body, req.params.id, this._warehouseRepository)
            res.status(200).json("Updated");
        } catch(error) {
            console.log(error)
            if(error instanceof NotFoundError){
                res.status(404).json({ error: error.message });
            }else{
                console.log(error)
                res.status(400).json({ error: error.message });
            }
        }
    }

    public async getInfo(req: any, res: any) {
        try {
            let warehouseDTO = await this._getWarehouseInfoUseCase.execute(req.params.name, this._warehouseRepository)
            res.status(200).json(warehouseDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async getStockInfo(req: any, res: any) {
        try {
            const productInfo = {
                category: req.params.category,
                brand: req.params.brand,
                model: req.params.model,
                year: req.params.year,
                warehouseName: req.params.warehouse,
            }
            let stockInfo = await this._getStockInfoUseCase.execute(productInfo, this._warehouseRepository)
            res.status(200).json(stockInfo);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async getAllWarehouses(req: any, res: any) {
        try {
            let warehouses = await this._getAllWarehouseUseCase.execute(this._warehouseRepository)
            res.status(200).json(warehouses)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }
}