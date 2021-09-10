import { Repository } from "../Repositoty";
import { User } from "../../entity/User";

export interface IUserRepository extends Repository<User> {
    getUserById(clientId: string): Promise<User | undefined>
    getUserByEmail(email: string): Promise<User | undefined>
    getAllUsers(): Promise<User[]>
}