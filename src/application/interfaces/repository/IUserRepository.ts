import { IBaseRepository } from "./IBaseRepositoty";
import { User } from "../../../domain/entity/User";

export interface IUserRepository extends IBaseRepository<User> {
    getUserById(clientId: string): Promise<User | undefined>
    getUserByEmail(email: string): Promise<User | undefined>
    getAllUsers(): Promise<User[]>
}