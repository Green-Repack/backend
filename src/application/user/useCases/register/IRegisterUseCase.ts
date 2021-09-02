import { IUserDTO } from "../../dto/IUserDTO";

export interface IRegisterUseCase {
    execute(userInfo: IUserDTO): Promise<boolean>
}