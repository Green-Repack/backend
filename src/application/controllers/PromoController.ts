import autoBind from "auto-bind";
import { injectable, inject } from "inversify";
import { TYPES } from "../commons/types";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { CreatePromoCoinsUseCase } from "../useCases/promotion/CreatePromoCoinsUseCase";
import { DeletePromoUseCase } from "../useCases/promotion/DeletePromoCoinsUseCase";
import { GetAllPromoUseCase } from "../useCases/promotion/GetAllPromoCoinsUseCase";
import { GetPromoUseCase } from "../useCases/promotion/GetPromoUseCase";

@injectable()
export class PromoController{
    private readonly _createPromoCoinsUseCase = new CreatePromoCoinsUseCase;
    private readonly _deletePromoUseCase = new DeletePromoUseCase;
    private readonly _getPromoUseCase = new GetPromoUseCase;
    private readonly _getAllPromoUseCase = new GetAllPromoUseCase;
    
    @inject(TYPES.IPromoCoinsRepository)
    private _promoCoinsRepository: IPromoCoinsRepository;
    
    public constructor() {
        autoBind(this)
    }

    public async createPromo(req: any, res: any) {
        try {
            await this._createPromoCoinsUseCase.execute(req.body, this._promoCoinsRepository)
            res.sendStatus(201)
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async getPromo(req: any, res: any) {
        try {
            let promo = await this._getPromoUseCase.execute(req.params.name, this._promoCoinsRepository)
            res.status(200).json(promo)
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async getAllPromo(req: any, res: any) {
        try {
            let promos = await this._getAllPromoUseCase.execute( this._promoCoinsRepository)
            res.status(200).json(promos)
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async deletePromo(req: any, res: any) {
        try {
            await this._deletePromoUseCase.execute(req.params.name, this._promoCoinsRepository)
            res.sendStatus(200)
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}