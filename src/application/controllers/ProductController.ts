import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IProductPriceRepository } from "../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { AddProductUseCase } from "../useCases/product/AddProductUseCase";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumber";
import { DeleteProductUseCase } from "../useCases/product/DeleteProductUseCase";
import { UpdateProductUseCase } from "../useCases/product/UpdateProductUseCase";
import { GetProductUseCase } from "../useCases/product/GetProductUseCase";
import autoBind from "auto-bind";

@injectable()
export class ProductController {
    private readonly _getSellsNumber = new GetSellsNumberUseCase;
    private readonly _addProductUseCase = new AddProductUseCase;
    private readonly _deleteProductUseCase = new DeleteProductUseCase;
    private readonly _updateProductUseCase = new UpdateProductUseCase;
    private readonly _getProductUseCase = new GetProductUseCase;
    
    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;
    @inject(TYPES.IUserRepository)
    private _userReposiory: IUserRepository;
    @inject(TYPES.IProductPriceRepository)
    private _productPriceRepository: IProductPriceRepository;

    public constructor() {
        autoBind(this)
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
    
    public async addProduct(req: any, res: any) {
        try {
            let newProduct = await this._addProductUseCase.execute(req.body, this._productRepository, this._productPriceRepository, req.userId)
            res.status(200).json(newProduct);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
    
    public async deleteProduct(req: any, res: any) {
        try {
            //TODO check user roles
            let isAdmin = true
            await this._deleteProductUseCase.execute(req.params.id, this._productRepository,req.userId, isAdmin)
            res.status(200).json("deleted");
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
    
    public async updateProduct(req: any, res: any) {
        try {
            //TODO check user roles
            let isAdmin = true
            await this._updateProductUseCase.execute(req.body, req.params.id,this._productRepository, this._productPriceRepository,req.userId, isAdmin)
            res.status(200).json("updated");
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
    
    public async getProduct(req: any, res: any) {
        try {
            let newProduct = await this._getProductUseCase.execute(req.params.id, this._productRepository)
            res.status(200).json(newProduct);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}