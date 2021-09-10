import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IUserDTO } from "../../dto/IUserDTO";
import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { ILoginUseCase } from "./ILoginUseCase";
import bcrypt from "bcryptjs"
import { JWToken } from "../../../commons/JWToken";
import { UserMap } from "../../mappers/UserMap";

export class LoginUseCase  implements ILoginUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }
    
    async execute(email: string, password: string): Promise<IUserDTO> {
        let token = ""
        let user = await this._userRepository.getUserByEmail(email)
        if (user == undefined) throw new InvalidCredentialsError()

        let passwordVerification = await bcrypt.compare(password, user.password);
        if(!passwordVerification) throw new InvalidCredentialsError()

        if (process.env.TOKEN_EXPIRATION != undefined) {
            token = JWToken.generateToken(Number.parseInt(process.env.TOKEN_EXPIRATION), user.id)
        } else {
            token = JWToken.generateToken(172000, user.id)
        }
        
        let userDTO = UserMap.toDTO(user)
        userDTO.token = token
        
        await this._userRepository.save(UserMap.toDomain(userDTO))
        return userDTO
    }

}