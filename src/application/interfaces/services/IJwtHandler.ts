export interface IJwtHandler {
    generateToken(expireTime: number, id: string): Promise<string>
    verifyToken(jwtToken: string): Promise<string>
}