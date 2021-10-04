export interface IJwtHandler {
    generateToken(id: string): Promise<string>
    verifyToken(jwtToken: string): Promise<string>
}