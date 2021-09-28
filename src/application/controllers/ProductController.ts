import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../interfaces/services/IPaymentHandler";
import { AcceptProductUseCase } from "../useCases/green_repack/AcceptProductUseCase";
import { AddProductUseCase } from "../useCases/green_repack/AddProductUseCase";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumber";
import { RefuseProductUseCase } from "../useCases/green_repack/RefuseProductUseCase";

@injectable()
export class ProductController {
    private readonly _getSellsNumberUseCase = new GetSellsNumberUseCase;

    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;

    public constructor() {
        autoBind(this);
    }
    
    public async getSellsNumber(req: any, res: any) {
        try {
            let number = await this._getSellsNumberUseCase.execute(req.body, this._productRepository)
            res.status(200).json(number)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}