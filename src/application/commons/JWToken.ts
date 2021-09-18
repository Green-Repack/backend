import jwt from "jsonwebtoken"
import { InvalidTokenError } from "./errors/InvalidTokenError";

export class JWToken {

    public static generateToken(expirationTime: number, id: string): string {
        const token = jwt.sign({_id: id}, this.jwtKey(), {expiresIn: expirationTime })
        return token
    }

    public static async verifyToken(token: string): Promise<string> {
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

