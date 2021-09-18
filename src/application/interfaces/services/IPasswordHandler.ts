export interface IPasswordHandler {
    generatePasswordHash(password: string): string
    checkPassword(passwordHash: string, password: string): string
}