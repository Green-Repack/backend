import { IJwtHandler } from "../../application/interfaces/services/IJwtHandler";

export class JwtHandler implements IJwtHandler {
    public generateToken(expireTime: number, id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    public async verifyToken(jwtToken: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
    private static generateToken(expirationTime: number, id: string): string {
        const token = jwt.sign({_id: id}, this.jwtKey(), {expiresIn: expirationTime })
        return token
    }

    private static async verifyToken(token: string): Promise<string> {
        const jwtData: any = await jwt.verify(token, this.jwtKey());
        return this.paylordVerification(jwtData)
    }

    private static jwtKey(): string {
        let jwtKey = process.env.JWT_KEY
        if (jwtKey != undefined) {
            return jwtKey
        } else {
            return "simplejwtkey"
        }
    }
    
    private static paylordVerification(payload: any): string {
        if (typeof payload === 'string') throw new InvalidTokenError("The payload is missing")
        else return payload._id.toString()
    }
}