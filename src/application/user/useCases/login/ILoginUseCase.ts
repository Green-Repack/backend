import { IUserDTO } from "../../dto/IUserDTO";

export interface ILoginUseCase {
    execute(email: string, password: string): Promise<IUserDTO>
}