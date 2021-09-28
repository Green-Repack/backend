import autoBind from "auto-bind";
import { injectable, inject } from "inversify";
import { TYPES } from "../commons/types";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { CreatePromoCoinsUseCase } from "../useCases/green_repack/CreatePromoCoinsUseCase";

@injectable()
export class PromoController{
    private readonly _createPromoCoinsUseCase = new CreatePromoCoinsUseCase;
    
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
            console.log(error)
            res.status(400).json(error);
        }
    }
    
}