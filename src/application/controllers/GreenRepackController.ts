import { IGreenRepackRepository } from "../../domain/interface/green_repack/IGreenRepackRepository";
import { GreenRepackRepository } from "../../infrastructure/persistence/repositories/GreenRepackRepository";
import { GreenRepackMap } from "../green_repack/mappers/GreenRepackMap";
import { CreateNewMemberUseCase } from "../green_repack/useCases/createNewMember/CreateNewMemberUseCase";
import { LoginMemberUseCase } from "../green_repack/useCases/loginMember/LoginMemberUseCase";
import { BaseController } from "./BaseController";

export class GreenRepackController extends BaseController{
    static _greenRepackRepository: IGreenRepackRepository = new GreenRepackRepository;

    public async createNewMember(req: any, res: any) {
        try {
            let createNewMemberUseCase = new CreateNewMemberUseCase(GreenRepackController._greenRepackRepository)
            let username = await createNewMemberUseCase.execute(GreenRepackMap.toDTO(GreenRepackMap.toDomain(req.body)))
            res.status(201).json(username);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async loginMember(req: any, res: any) {
        try {
            let loginMemberUseCase = new LoginMemberUseCase(GreenRepackController._greenRepackRepository)
            let userDTO = await loginMemberUseCase.execute(req.body.username, req.body.password)
            res.status(200).json(userDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}