import { UserRepository } from "../../infrastructure/persistence/repositories/UserRepository";
import { UserMap } from "../user/mappers/UserMap";
import { RegisterUseCase } from "../user/useCases/register/RegisterUseCase";
import { BaseController } from "./BaseController";

export class UserController extends BaseController{
    public async register(req: any, res: any) {
        try {
            let userRepository = new UserRepository()
            let registerUseCase = new RegisterUseCase(userRepository)
            registerUseCase.execute(UserMap.toDTO(UserMap.toDomain(req.body)))
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
        }
    }
}