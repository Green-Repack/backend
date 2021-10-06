import autoBind from "auto-bind";
import { injectable, inject } from "inversify";
import { TYPES } from "../commons/types";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IGeneratorIdHandler } from "../interfaces/services/IGeneratorIdHandler";
import { IStripeHandler } from "../interfaces/services/IStripeHandler";

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

    @inject(TYPES.IStripeHandler)
    private _stripeHandler: IStripeHandler
    @inject(TYPES.IGenertorIdHandler)
    private _iDGeneratorHandler: IGeneratorIdHandler;
    
    public constructor() {
        autoBind(this)
    }

    public async updateInfo(req: any, res: any) {
        try {
            const sig = req.headers['stripe-signature'];
            const event = this._stripeHandler.createWebhookEvent(req.body, sig)

            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    this._stripeHandler.handlePaymentIntentSucceeded(paymentIntent, this._iDGeneratorHandler, this._promoCoinsRepository,
                        this._userReposiory, this._productRepository, this._warehouseRepository)
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            res.json({received: true})
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }
}