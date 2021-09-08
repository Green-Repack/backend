import { UserMap } from "../../../application/user/mappers/UserMap";
import { User } from "../../../domain/entity/User";
import { IUserRepository } from "../../../domain/interface/user/IUserRepository";
import { UserModel } from "../schemas/User";

export class UserRepository implements IUserRepository {
    async exists(email: string): Promise<boolean> {
        let user = await UserModel.findOne({email: email.toLowerCase()})
        if (user) return true
        else return false
    }

    async getUserById(userId: string): Promise<User | null> {
        let user = await UserModel.findById(userId)
        if (user) return UserMap.toDomain(user)
        else return null
    }

    async getUserByEmail(email: string): Promise<User | null> {
        let user = await UserModel.findOne({email: email.toLowerCase()})
        if (user) return UserMap.toDomain(user)
        else return null
    }

    async getAllUsers(): Promise<User[]> {
        let result: User[] = new Array<User>()
        let users = await UserModel.find({})
        for(var user of users) {
            result.push(UserMap.toDomain(user))
        }
        return result
    }

    async delete(userId: string): Promise<void> {
        await UserModel.findByIdAndDelete(userId)
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