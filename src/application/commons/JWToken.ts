const jwt = require("jsonwebtoken");

export class JWToken {
    public static generateToken(expirationTime: number, id: string): string {
        const token = jwt.sign({_id: id}, process.env.JWT_KEY, {expiresIn: expirationTime })
        return token
    }

    public static async verifyToken(token: string): Promise<string> {
        const jwtData = await jwt.verify(token, process.env.JWT_KEY);

        if (!jwtData) return jwtData._id
        else return ""
    }
}

