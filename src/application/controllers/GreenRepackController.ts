import { ICategoryRepository } from "../../domain/entityProperties/category_produit/ICategoryRepository";
import { IEntrepotRepository } from "../../domain/entityProperties/entrepot/IEntrepotRepository";
import { IGreenRepackRepository } from "../../domain/entityProperties/green_repack/IGreenRepackRepository";
import { CategoryRepository } from "../../infrastructure/persistence/repositories/CategoryRepository";
import { EntrepotRepository } from "../../infrastructure/persistence/repositories/WarehouseRepository";
import { GreenRepackRepository } from "../../infrastructure/persistence/repositories/GreenRepackRepository";
import { GreenRepackMap } from "../green_repack/mappers/GreenRepackMap";
import { AddNewCategryUseCase } from "../green_repack/useCases/addNewCategory/AddNewCategoryUseCase";
import { CreateNewMemberUseCase } from "../green_repack/useCases/CreateNewMemberUseCase";
import { DeleteCategoryUseCase } from "../green_repack/useCases/deleteCategory/DeleteCategoryUseCase";
import { GetStockInfoUseCase } from "../green_repack/useCases/getStockInfo/GetStockInfoUseCase";
import { LoginMemberUseCase } from "../green_repack/useCases/loginMember/LoginMemberUseCase";
import { BaseController } from "./BaseController";

export class GreenRepackController extends BaseController{
    static _greenRepackRepository: IGreenRepackRepository = new GreenRepackRepository;
    static _entrepotRepository: IEntrepotRepository = new EntrepotRepository;
    static _categoryRepository: ICategoryRepository = new CategoryRepository

    public async createNewMember(req: any, res: any) {
        try {
            let createNewMemberUseCase = new CreateNewMemberUseCase(GreenRepackController._greenRepackRepository)
            let username = await createNewMemberUseCase.execute(GreenRepackMap.toDTO(GreenRepackMap.toDomain(req.body)))
            res.status(201).json(username);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async loginMember(req: any, res: any) {
        try {
            let loginMemberUseCase = new LoginMemberUseCase(GreenRepackController._greenRepackRepository)
            let userDTO = await loginMemberUseCase.execute(req.body.username, req.body.password)
            res.status(200).json(userDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfoByCategory(req: any, res: any) {
        try {
            let getStockInfoUserCase = new GetStockInfoUseCase(GreenRepackController._entrepotRepository)
            let info = await getStockInfoUserCase.execute(req.body.category, undefined, undefined, undefined)
            if (info == undefined) res.sendStatus(404)
            else res.status(200).json(info)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfoByCategoryFromEntrepot(req: any, res: any) {
        try {
            let getStockInfoUserCase = new GetStockInfoUseCase(GreenRepackController._entrepotRepository)
            let info = await getStockInfoUserCase.execute(req.body.category, undefined, undefined, req.body.entrepot)
            if (info == undefined) res.sendStatus(404)
            else res.status(200).json(info)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfoByBrand(req: any, res: any) {
        try {
            let getStockInfoUserCase = new GetStockInfoUseCase(GreenRepackController._entrepotRepository)
            let info = await getStockInfoUserCase.execute(undefined, req.body.brand, undefined, undefined)
            if (info == undefined) res.sendStatus(404)
            else res.status(200).json(info)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfoByBrandFromEntrepot(req: any, res: any) {
        try {
            let getStockInfoUserCase = new GetStockInfoUseCase(GreenRepackController._entrepotRepository)
            let info = await getStockInfoUserCase.execute(undefined, req.body.brand, undefined, req.body.entrepot)
            if (info == undefined) res.sendStatus(404)
            else res.status(200).json(info)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
 
    public async getStockInfoByModel(req: any, res: any) {
        try {
            let getStockInfoUserCase = new GetStockInfoUseCase(GreenRepackController._entrepotRepository)
            let info = await getStockInfoUserCase.execute(req.body.category, req.body.brand, req.body.model, undefined)
            if (info == undefined) res.sendStatus(404)
            else res.status(200).json(info)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfoByModelFromEntrepot(req: any, res: any) {
        try {
            let getStockInfoUserCase = new GetStockInfoUseCase(GreenRepackController._entrepotRepository)
            let info = await getStockInfoUserCase.execute(req.body.category, req.body.brand, req.body.model, req.body.entrepot)
            if (info == undefined) res.sendStatus(404)
            else res.status(200).json(info)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async addNewProductCategory(req: any, res: any) {
        try {
            let addNewCategoryUseCase = new AddNewCategryUseCase(GreenRepackController._categoryRepository)
            await addNewCategoryUseCase.execute(req.body.name)
            res.sendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async deleteProductCategory(req: any, res: any) {
        try {
            let deleteCategoryUseCase = new DeleteCategoryUseCase(GreenRepackController._categoryRepository)
            await deleteCategoryUseCase.execute(req.body.name)
            res.sendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}