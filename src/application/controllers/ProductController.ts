import {ProductRepository} from "../../infrastructure/persistence/repositories/ProductRepository";
import {AddNewProduct} from "../green_repack/useCases/addNewProduct/AddNewProduct";
import {BaseController} from "./BaseController";

export class ProductController extends BaseController{

    public async createProduct(req: any, res: any){
        try{
            let productRepository = new ProductRepository();
            let addNewProductUseCase = new AddNewProduct(productRepository);

            await addNewProductUseCase.execute(req.body, "role", "userId")
        }catch (e) {
            res.status(400).json(e.message);
        }
    }
}
