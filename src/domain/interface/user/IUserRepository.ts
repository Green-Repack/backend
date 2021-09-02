import { Repository } from "../Repositoty";
import { User } from "../../entity/User";

export interface IUserRepository extends Repository<User> {
    getUserById(clientId: string): Promise<User>
    getUserByEmail(email: string): Promise<User>
    getAllUsers(): Promise<User[]>
}