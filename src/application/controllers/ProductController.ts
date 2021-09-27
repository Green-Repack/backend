import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumber";

@injectable()
export class ProductController {
    private readonly _getSellsNumber = new GetSellsNumberUseCase;

    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;

    public constructor() {
        autoBind(this);
    }

    public async getSellsNumber(req: any, res: any) {
        try {
            let number = await this._getSellsNumber.execute(req.body, this._productRepository)
            res.status(200).json(number)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}