import Stripe from 'stripe';
import {User} from "../../../domain/entity/User";
import {Guard} from "../../commons/Guard";
import {IProductRepository} from "../../interfaces/repository/IProductRepository";
import {IPromoCoinsRepository} from "../../interfaces/repository/IPromoCoinsRepository";
import {IUserRepository} from "../../interfaces/repository/IUserRepository";
import {IWarehouseRepository} from "../../interfaces/repository/IWarehouseRepository";
import {IPaymentHandler} from "../../interfaces/services/IPaymentHandler";
import {ProductMap} from "../../mappers/ProductMap";
import {UserMap} from "../../mappers/UserMap";
import {PurchasePromiseStatus} from "../../user/enum/PurchasePromiseStatus";
import {IBuyUseCase} from "./IBuyUseCase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

export class BuyUseCase implements IBuyUseCase {
    _totalPrice: number = 0
    _paymentIntentInfo: {
        description: string,
        statement: string,
        nb_article: 0
    }

    async execute(userId: string, itemBucket: any, paymentHandler: IPaymentHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository, 
        promoCoinsRepository: IPromoCoinsRepository, request: any, view: any): Promise<string> {
        try {
            const {product} = request
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            Guard.AgainstNullOrUndefined(itemBucket, "Bucket is required")

            let promoMultiplier = 1
            let currentDate = new Date()

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let promotion = await promoCoinsRepository.getActivePromo(new Date())
            if (promotion !=  undefined) promoMultiplier = promotion.multiplicateur

            let userDTO = UserMap.toDTO(user)
            let secretKey = paymentHandler.acceptPayment(this._totalPrice)

            if (userDTO.greenCoins.expireDate != undefined) {
                if (currentDate.toISOString() === userDTO.greenCoins.expireDate.toISOString()) {
                    userDTO.greenCoins.amount = 0
                }
            }

            userDTO.greenCoins.amount += ((this._totalPrice % 10) * promoMultiplier)
            userDTO.greenCoins.expireDate = new Date(1, 1, currentDate.getFullYear() + 2)

            let itemsId = await this.updateProductStock(itemBucket, warehouseRepository, productRepository)
            userDTO.achats.push({
                amount: this._totalPrice,
                paymentDate: new Date(),
                itemsId: itemsId
            })

            await userRepository.save(UserMap.toDomain(userDTO))

            let paymentIntent = await this.paymentIntentCreation(user)

            return view.render("", {
                client_secret: paymentIntent.client_secret,
                publishable_key: process.env.STRIPE_PUBLIC_KEY,
                product
            })
        } catch(error) {
            throw error
        }
    }

    private async updateProductStock(itemsBucket: any, warehouseRepository: IWarehouseRepository, 
        productRepository: IProductRepository): Promise<Array<string>> {
        let itemsId = new Array<string>()
        for(var article of itemsBucket) {
            let product = await productRepository.getProductById(article.id)
            if (product != undefined) {
                if(product.status == PurchasePromiseStatus.Accepted) {
                    itemsId.push(product.id)
                    let productDTO = ProductMap.toDTO(product)
                    this._paymentIntentInfo.description+=("x1 "+productDTO.name+"\n ")
                    this._paymentIntentInfo.statement+=("x1 "+productDTO.name+"\n ").substring(0,22)
                    this._paymentIntentInfo.nb_article+=1
                    this._totalPrice+=productDTO.price
                    productDTO.sold = true
                    await productRepository.save(ProductMap.toDomain(productDTO))
                    await warehouseRepository.updateStockProduct(product, product.warehouseId, article.quantity)
                }else {
                    throw new UnauthorizedError("Product is not accepted therefore it can't be bought : "+ article.id)
                }
            } else {
                throw new NotFoundError("Product not found : " + article.id)
            }
        }
        return itemsId
    }


    private async paymentIntentCreation(user: User){
        return  stripe.paymentIntents.create({
            amount: this._totalPrice*100,
            currency: "eur",
            receipt_email: user.email,
            description: this._paymentIntentInfo.description,
            statement_descriptor: this._paymentIntentInfo.statement,
            metadata: {
                nb_article: this._paymentIntentInfo.nb_article
            }
        })

    }
}