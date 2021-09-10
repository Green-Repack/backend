import { IGreenRepackRepository } from "../../../../domain/interface/green_repack/IGreenRepackRepository"
import { JWToken } from "../../../commons/JWToken"
import { InvalidCredentialsError } from "../../../user/errors/InvalidCredentialsError"
import { IGreenRepackDTO } from "../../dto/IGreenRepackDTO"
import { ILoginMemberUseCase } from "./ILoginMemberUseCase"
import bcrypt from "bcryptjs"
import { GreenRepackMap } from "../../mappers/GreenRepackMap"

export class LoginMemberUseCase  implements ILoginMemberUseCase {
    private _greenRepackRepository: IGreenRepackRepository

    constructor(greenRepackRepository: IGreenRepackRepository) {
        this._greenRepackRepository = greenRepackRepository
    }
    
    async execute(username: string, password: string): Promise<IGreenRepackDTO> {
        let token = ""
        let member = await this._greenRepackRepository.getMemberByUsername(username)
        if (member == undefined) throw new InvalidCredentialsError()

        let passwordVerification = await bcrypt.compare(password, member.password);
        if(!passwordVerification) throw new InvalidCredentialsError()

        if (process.env.TOKEN_EXPIRATION != undefined) {
            token = JWToken.generateToken(Number.parseInt(process.env.TOKEN_EXPIRATION), member.id)
        } else {
            token = JWToken.generateToken(172000, member.id)
        }
        
        let greenRepackDTO = GreenRepackMap.toDTO(member)
        greenRepackDTO.token = token
        
        await this._greenRepackRepository.save(GreenRepackMap.toDomain(greenRepackDTO))
        return greenRepackDTO
    }

}