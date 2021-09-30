import autoBind from "auto-bind";
import { injectable, inject } from "inversify";
import { TYPES } from "../commons/types";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IGeneratorIdHandler } from "../interfaces/services/IGeneratorIdHandler";
import { IPaymentHandler } from "../interfaces/services/IPaymentHandler";

@injectable()
export class WebhookController{
    
    @inject(TYPES.IWarehouseRepository)
    private _warehouseRepository: IWarehouseRepository;
    @inject(TYPES.IUserRepository)
    private _userReposiory: IUserRepository;
    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;
    @inject(TYPES.IPromoCoinsRepository)
    private _promoCoinsRepository: IPromoCoinsRepository;

    @inject(TYPES.IPaymentHandler)
    private _paymentHandler: IPaymentHandler
    @inject(TYPES.IGenertorIdHandler)
    private _iDGeneratorHandler: IGeneratorIdHandler;
    
    public constructor() {
        autoBind(this)
    }

    public async updateInfo(req: any, res: any) {
        try {
            const sig = res.headers['stripe-signature'];
            const event = this._paymentHandler.createWebhookEvent(req.body, sig)

            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    this._paymentHandler.handlePaymentIntentSucceeded(paymentIntent, this._iDGeneratorHandler, this._promoCoinsRepository,
                        this._userReposiory, this._productRepository, this._warehouseRepository)
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            res.json({received: true})
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}