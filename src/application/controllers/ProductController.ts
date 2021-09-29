import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumberUseCase";
import { GetAllProductUseCase } from "../useCases/user/GetAllProductUseCase";
import { GetProductByBrandUseCase } from "../useCases/user/GetProductByBrandUseCase";
import { GetProductByCategoryUseCase } from "../useCases/user/GetProductByCategoryUseCase";

@injectable()
export class ProductController {
    private readonly _getSellsNumberUseCase = new GetSellsNumberUseCase;
    private readonly _getAllProductUseCase = new GetAllProductUseCase;
    private readonly _getPrductByCategoryUseCase = new GetProductByCategoryUseCase
    private readonly _getPrductByBrandUseCase = new GetProductByBrandUseCase

    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;

    public constructor() {
        autoBind(this);
    }

    public async getAllProduct(req: any, res: any) {
        try {
            let productsInfo = await this._getAllProductUseCase.execute(this._productRepository)
            res.status(200).json(productsInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getProductByCategory(req: any, res: any) {
        try {
            const {category} = req.body
            let productsInfo = await this._getPrductByCategoryUseCase.execute(category, this._productRepository)
            res.status(200).json(productsInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getProductByBrand(req: any, res: any) {
        try {
            const {category, brand} = req.body
            let productsInfo = await this._getPrductByBrandUseCase.execute(category, brand, this._productRepository)
            res.status(200).json(productsInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
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