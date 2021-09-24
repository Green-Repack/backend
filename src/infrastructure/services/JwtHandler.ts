import { IJwtHandler } from "../../application/interfaces/services/IJwtHandler";
import config from "../../../config";
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../../application/errors/UnauthorizedError";
import { injectable } from "inversify";

@injectable()
export class JwtHandler implements IJwtHandler {
    public async generateToken(id: string): Promise<string> {
        const token = await jwt.sign({_id: id}, config.JWT_KEY, {expiresIn: config.TOKEN_EXPIRATION })
        return token
    }
    
    public async verifyToken(jwtToken: string): Promise<string> {
        const jwtData: any = await jwt.verify(jwtToken, config.JWT_KEY);
        return this.payloadVerification(jwtData)
    }
    
    private payloadVerification(payload: any): string {
        if (typeof payload === 'string') throw new UnauthorizedError("Payload missing")
        else return payload._id.toString()
    }
}