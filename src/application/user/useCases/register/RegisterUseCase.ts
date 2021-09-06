import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IUserDTO } from "../../dto/IUserDTO";
import { IRegisterUseCase } from "./IRegisterUseCase";
const User = require("../../../../infrastructure/persistence/schemas/User");
const validator = require("validator");
const bcrypt = require("bcryptjs");

export class RegisterUseCase  implements IRegisterUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }

    valideEmail(email: string) {
        return validator.isEmail(email);
    }

    async execute(userInfo: IUserDTO): Promise<boolean> {
        if (!userInfo.firstName || userInfo.firstName.toString() === "") throw new Error("First name is required.")
        if (!userInfo.lastName || userInfo.lastName.toString() === "") throw new Error("Last name is required.")
        if (!userInfo.email || userInfo.email.toString() === "") throw new Error("Email is required.")
        if (!userInfo.password || userInfo.password.toString() === "") throw new Error("Password is required.")

        if (!this.valideEmail(userInfo.email)) throw new Error("Email address is not valide.")

        let user = await User.findOne({ email: userInfo.email.toLowerCase() });
        if (user) throw new UnauthorizedError("Email is already use")


        let newUser = new User({
            firstName: !userInfo.firstName,
            lastName: !userInfo.lastName,
            email: !userInfo.email.toLowerCase(),
            address: {
                streetName: userInfo.address.streetName,
                zipCode: userInfo.address.zipCode,
                city: userInfo.address.city,
                country: userInfo.address.country,
            },
            siret: userInfo.siret!,
            siren: userInfo.siren!
        });
        newUser.greenCoins = 0
        newUser.marchand = false


        const hash = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(userInfo.password, hash);

        const tokenExpiresTime = 60*60*48;
        return newUser.generateAuthToken(tokenExpiresTime);
    }
    
}