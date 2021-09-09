import jwt from "jsonwebtoken"

export class JWToken {

    public static generateToken(expirationTime: number, id: string): string {
        const token = jwt.sign({_id: id}, this.jwtKey(), {expiresIn: expirationTime })
        return token
    }

    public static async verifyToken(token: string): Promise<any | undefined> {
        const jwtData = await jwt.verify(token, this.jwtKey());

        if (!jwtData) return jwtData
        else return undefined
    }

    private static jwtKey(): string {
        let jwtKey = process.env.JWT_KEY
        if (jwtKey != undefined) {
            return jwtKey
        } else {
            return "simplejwtkey"
        }
    }
}

