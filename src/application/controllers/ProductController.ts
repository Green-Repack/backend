import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumber";
import { BaseController } from "./BaseController";

export class ProductController extends BaseController {
    private readonly _getSellsNumber = new GetSellsNumberUseCase;

    private _productRepository: IProductRepository;

    public constructor(productRepository: IProductRepository) {
        super();
        this._productRepository = productRepository
        
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