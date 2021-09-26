import { Container } from "inversify";
import { TYPES } from "./src/application/commons/types";
import { IUserRepository } from "./src/application/interfaces/repository/IUserRepository";
import { IAssociationRepository } from "./src/application/interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "./src/application/interfaces/repository/IGreenRepackRepository";
import { IProductRepository } from "./src/application/interfaces/repository/IProductRepository";
import { IWarehouseRepository } from "./src/application/interfaces/repository/IWarehouseRepository";
import { IPromoCoinsRepository } from "./src/application/interfaces/repository/IPromoCoinsRepository";
import { IPaymentHandler } from "./src/application/interfaces/services/IPaymentHandler";
import { IPasswordHandler } from "./src/application/interfaces/services/IPasswordHandler";
import { IJwtHandler } from "./src/application/interfaces/services/IJwtHandler";
import { IAssociationHandler } from "./src/application/interfaces/services/IAssociationHandler";
import { IDeliveryTicketHandler } from "./src/application/interfaces/services/IDeliveryTicketHandler";
import {ProductRepository} from "./src/infrastructure/persistence/repositories/ProductRepository";
import { UserRepository } from "./src/infrastructure/persistence/repositories/UserRepository";
import { AssociationRepository } from "./src/infrastructure/persistence/repositories/AssociationRepository";
import { GreenRepackRepository } from "./src/infrastructure/persistence/repositories/GreenRepackRepository";
import { WarehouseRepository } from "./src/infrastructure/persistence/repositories/WarehouseRepository";
import { PromoCoinsRepository } from "./src/infrastructure/persistence/repositories/PromoCoinsRepository";
import { PaymentHandler } from "./src/infrastructure/services/PaymentHandler";
import { PasswordHandler } from "./src/infrastructure/services/PasswordHandler";
import { JwtHandler } from "./src/infrastructure/services/JwtHandler";
import { AssociaionHandler } from "./src/infrastructure/services/AssociationHandler";
import { DeliveryTicketHanlder } from "./src/infrastructure/services/DeliveryTicketHandler";
import { ProductPriceRepository } from "./src/infrastructure/persistence/repositories/ProductPriceRepository";
import { IProductPriceRepository } from "./src/application/interfaces/repository/IProductPriceRepository";

const DIcontainer = new Container()
DIcontainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
DIcontainer.bind<IGreenRepackRepository>(TYPES.IGreeRepackRepository).to(GreenRepackRepository)
DIcontainer.bind<IAssociationRepository>(TYPES.IAssociationRepository).to(AssociationRepository)
DIcontainer.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository)
DIcontainer.bind<IPromoCoinsRepository>(TYPES.IPromoCoinsRepository).to(PromoCoinsRepository)
DIcontainer.bind<IWarehouseRepository>(TYPES.IWarehouseRepository).to(WarehouseRepository)
DIcontainer.bind<IProductPriceRepository>(TYPES.IProductPriceRepository).to(ProductPriceRepository)

DIcontainer.bind<IPaymentHandler>(TYPES.IPaymentHandler).to(PaymentHandler)
DIcontainer.bind<IPasswordHandler>(TYPES.IPasswordHandler).to(PasswordHandler)
DIcontainer.bind<IJwtHandler>(TYPES.IJwtHandler).to(JwtHandler)
DIcontainer.bind<IAssociationHandler>(TYPES.IAssociationHandler).to(AssociaionHandler)
DIcontainer.bind<IDeliveryTicketHandler>(TYPES.IDeliveryTicketHandler).to(DeliveryTicketHanlder)


export default DIcontainer