import { UserRepository } from "../../infrastructure/persistence/repositories/UserRepository";
import { UserMap } from "../user/mappers/UserMap";
import { LoginUseCase } from "../user/useCases/login/LoginUseCase";
import { RegisterUseCase } from "../user/useCases/register/RegisterUseCase";
import { BaseController } from "./BaseController";

export class UserController extends BaseController{
    static _userRepository: UserRepository = new UserRepository;

    public async register(req: any, res: any) {
        try {
            let registerUseCase = new RegisterUseCase(UserController._userRepository)
            await registerUseCase.execute(UserMap.toDTO(UserMap.toDomain(req.body)))
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async login(req: any, res: any) {
        try {
            let loginUseCase = new LoginUseCase(UserController._userRepository)
            let userDTO = await loginUseCase.execute(req.body.email, req.body.password)
            res.status(200).json(userDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}