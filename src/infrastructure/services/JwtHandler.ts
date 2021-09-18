import { IJwtHandler } from "../../application/interfaces/services/IJwtHandler";

export class JwtHandler implements IJwtHandler {
    generateToken(expireTime: number, id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    verifyToken(jwtToken: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}