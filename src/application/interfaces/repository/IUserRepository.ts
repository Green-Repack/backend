import { IBaseRepository } from "./IBaseRepositoty";
import { User } from "../../../domain/entity/User";
import { IShippingLabel } from "../../../domain/entityProperties/IShippingLabel";

export interface IUserRepository extends IBaseRepository<User> {
    getUserById(clientId: string): Promise<User | undefined>
    getUserByEmail(email: string): Promise<User | undefined>
    getAllUsers(): Promise<User[]>
    updateProductSoldStatus(email: string, productId: string, sellStatus: string): Promise<void>
    updateProductSoldDate(email: string, productId: string, sellDate: Date): Promise<void>
    updateProductSoldPriceReceived(email: string, productId: string, priceReceived: number): Promise<void>
    updateShippingLabelExpirationStatus(email: string, productId: string, expired: boolean): Promise<void>
    updateProductSoldAddShippingLabel(email: string, productId: string, shippingLabel: IShippingLabel): Promise<void>
}