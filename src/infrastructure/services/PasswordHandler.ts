import { IPasswordHandler } from "../../application/interfaces/services/IPasswordHandler";
import bcrypt from "bcryptjs"
import { injectable } from "inversify";

@injectable()
export class PasswordHandler implements IPasswordHandler {
    public async generatePasswordHash(password: string): Promise<string> {
        const hash = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(password, hash);
        return passwordHash
    }
    public async checkPassword(passwordHash: string, password: string): Promise<boolean> {
        let passwordVerification = await bcrypt.compare(password, passwordHash);
        return passwordVerification
    }
    
}