import { Repository } from "../Repositoty";
import { User } from "../../entity/User";

export interface IUserRepository extends Repository<User> {
    getUserById(clientId: string): Promise<User | null>
    getUserByEmail(email: string): Promise<User | null>
    getAllUsers(): Promise<User[]>
}