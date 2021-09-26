import {IProductRepository} from "../../../interfaces/repository/IProductRepository";
import {IProductPriceRepository} from "../../../../domain/interface/product/productData/IProductPriceRepository";
import {ProductPriceRepository} from "../../../../infrastructure/persistence/repositories/ProductPriceRepository";
import {IProductDTO} from "../../../user/dto/IProductDTO";
import {Role} from "../../../user/enum/Role";
import {CreateProductService} from "../../../user/services/CreateProductService";
import {IAddNewProduct} from "./IAddNewProduct";

export class AddNewProduct implements IAddNewProduct {
    private _productPriceRepository: IProductPriceRepository;
    private _productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this._productPriceRepository = new ProductPriceRepository();
        this._productRepository = productRepository;
    }

    public async execute(productDTO: IProductDTO, userRole: string, userId: string): Promise<void> {
        if (userRole.toLowerCase() !== Role.Company.toString().toLowerCase()) {
            throw new UnauthorizedError("You don't have the right to create a product.");
        }

        try {
            const category = productDTO.category.toString();
            const state = productDTO.state.toString();

            const diffDate = new Date().getFullYear()-productDTO.specificities.productionYear;

            const price = await this.generateProductPrice(category, state, diffDate);

            const newProduct = await CreateProductService.create(productDTO, userId, price);

            await this._productRepository.save(newProduct);
        } catch (e) {
            throw new Error("Couldn't save the product. Try later.");
        }
    }

    private async generateProductPrice(category: string, state: string, diffDate: number): Promise<number>{
        const productDataPrice = await this._productPriceRepository.getByCategoryAndState(category, state);
        let price = productDataPrice!.price;
        return Math.exp(-diffDate)*price;
    }
}