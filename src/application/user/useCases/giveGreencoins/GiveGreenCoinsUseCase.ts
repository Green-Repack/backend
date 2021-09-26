import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IGiveGreenCoinsUseCase } from "./IGiveGreenCoinsUseCase";

export class GiveGreenCoinsUseCase  implements IGiveGreenCoinsUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }

    execute(associationId: string, quantity: number): void {
        throw new Error("Method not implemented.");
    }

    
}