import { UserMap } from "../../../application/mappers/UserMap";
import { User } from "../../../domain/entity/User";
import { IUserRepository } from "../../../application/interfaces/repository/IUserRepository";
import { UserModel } from "../schemas/User";
import { injectable } from "inversify";
import { IShippingLabel } from "../../../domain/entityProperties/IShippingLabel";

@injectable()
export class UserRepository implements IUserRepository {
    async updateProductSoldPriceReceived(email: string, productId: string, priceReceived: number): Promise<void> {
        await UserModel.updateOne({email: email.toLowerCase(), "productSold.productId": productId},
            {$set: {"productSold.$.priceReceived": priceReceived}})
    }

    async updateProductSoldAddShippingLabel(email: string, productId: string, shippingLabel: IShippingLabel): Promise<void> {
        await UserModel.updateOne({email: email.toLowerCase(), "productSold.productId": productId},
            {$set: {"productSold.$.shippigLabel": shippingLabel}})
    }
    async updateProductSoldStatus(email: string, productId: string, sellStatus: string): Promise<void> {
        await UserModel.updateOne({email: email.toLowerCase(), "productSold.productId": productId},
            {$set: {"productSold.$.sellStatus": sellStatus}})
    }

    async updateProductSoldDate(email: string, productId: string, sellDate: Date): Promise<void> {
        await UserModel.updateOne({email: email.toLowerCase(), "productSold.productId": productId},
        {$set: {"productSold.$.sellDate": sellDate}})
    }

    async updateShippingLabelExpirationStatus(email: string, productId: string, expired: boolean): Promise<void> {
        await UserModel.updateOne({email: email.toLowerCase(), "productSold.productId": productId},
        {$set: {"productSold.$.shippingLabel.expired": expired}})
    }
  
    async exists(idOrEmail: string): Promise<boolean> {
        let emailResult = await UserModel.findOne({email: idOrEmail.toLowerCase()})
        if (emailResult == null) {
            try {
                let idResult = await UserModel.findById(idOrEmail)
                if (idResult == null)  return false
                else return true
            } catch(error) {
                return false
            }
        } else {
            return true
        }
    }

    async getUserById(userId: string): Promise<User | undefined> {
        let user = await UserModel.findById(userId)
        if (user) return UserMap.toDomain(user)
        else return undefined
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        let user = await UserModel.findOne({email: email.toLowerCase()})
        if (user) return UserMap.toDomain(user)
        else return undefined
    }

    async getAllUsers(): Promise<User[]> {
        let result: User[] = new Array<User>()
        let users = await UserModel.find({})
        for(var user of users) {
            result.push(UserMap.toDomain(user))
        }
        return result
    }

    async delete(user: User): Promise<void> {
        await UserModel.deleteOne({email: user.email.toLowerCase()})
    }

    async save(user: User): Promise<void> {
        let exists = await this.exists(user.email)
        const rawUserData = UserMap.toPersistence(user)

        if (exists) {
            const mongooseUser = await UserModel.findOne({email: user.email.toLowerCase()})
            if (mongooseUser) await mongooseUser.updateOne(rawUserData)
        } else {
            await UserModel.create(rawUserData)
        }
    }  
}