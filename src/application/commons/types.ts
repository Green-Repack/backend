const TYPES = {
    IAssociationRepository: Symbol.for("IAssociationRepository"),
    IGreeRepackRepository: Symbol.for("IGreeRepackRepository"),
    IProductRepository: Symbol.for("IProductRepository"),
    IPromoCoinsRepository: Symbol.for("IPromoCoinsRepository"),
    IUserRepository: Symbol.for("IUserRepository"),
    IWarehouseRepository: Symbol.for("IWarehouseRepository"),
    IAssociationHandler: Symbol.for("IAssociationHandler"),
    IDeliveryTicketHandler: Symbol.for("IDeliveryTicketHandler"),
    IJwtHandler: Symbol.for("IJwtHandler"),
    IPasswordHandler: Symbol.for("IPasswordHandler"),
    IStripeHandler: Symbol.for("IStripeHandler"),
    IGenertorIdHandler: Symbol.for("IGenertorIdHandler"),
    IMerchantHandler: Symbol.for("IMerchantHandler"),
    IPushNotifHandler: Symbol.for("IPushNotifHandler")
}

export {TYPES}