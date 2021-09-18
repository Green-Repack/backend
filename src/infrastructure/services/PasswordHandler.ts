import { IPasswordHandler } from "../../application/interfaces/services/IPasswordHandler";

export class PasswordHandler implements IPasswordHandler {
    generatePasswordHash(password: string): string {
        throw new Error("Method not implemented.");
    }
    checkPassword(passwordHash: string, password: string): string {
        throw new Error("Method not implemented.");
    }
    
}