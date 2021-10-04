export interface IPasswordHandler {
    generatePasswordHash(password: string): Promise<string>
    checkPassword(passwordHash: string, password: string): Promise<boolean>
}