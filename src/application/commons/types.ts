const TYPES = {
    IAssociationRepository: Symbol.for("IAssociationRepository"),
    IGreenRepackRepository: Symbol.for("IGreenRepackRepository"),
    IProductRepository: Symbol.for("IProductRepository"),
    IPromoCoinsRepository: Symbol.for("IPromoCoinsRepository"),
    IUserRepository: Symbol.for("IUserRepository"),
    IWarehouseRepository: Symbol.for("IWarehouseRepository"),
    IProductPriceRepository: Symbol.for("IProductPriceRepository"),
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
