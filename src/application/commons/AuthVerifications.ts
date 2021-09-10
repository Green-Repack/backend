import { JWToken } from "./JWToken";
import { IUserRepository } from "../../domain/interface/user/IUserRepository";
import { UserRepository } from "../../infrastructure/persistence/repositories/UserRepository";
import { IGreenRepackRepository } from "../../domain/interface/green_repack/IGreenRepackRepository";
import { GreenRepackRepository } from "../../infrastructure/persistence/repositories/GreenRepackRepository";

export class AuthVerifications {
    static _userRepository: IUserRepository = new UserRepository;
    static _greenRepackRepository: IGreenRepackRepository = new GreenRepackRepository;

    public static async userAuth(req: any, res: any, next: any) {
        try {
            const authorization = req.header("Authorization");

            const splitAuthorizationHeader = authorization.toString().split(" ");

            const bearer = splitAuthorizationHeader[0];
            const token = splitAuthorizationHeader[1];

            if (bearer.toString() !== "Bearer") return res.status(401).json("The token is not a bearer")
            if (!token) return res.status(401).json("The token is missing")

            const iD = await JWToken.verifyToken(token)
            req.userId = iD
            
            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }

    public static async marchandAuthorization(req: any, res: any, next: any) {
        try {
            let user = await AuthVerifications._userRepository.getUserById(req.userId)
            if (user == undefined || !user.isMarchand()) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }

    public static async greenRepackAuthorization(req: any, res: any, next: any) {
        try {
            let member = await AuthVerifications._greenRepackRepository.getGreenRepackMemberById(req.userId)
            if (member == undefined) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }

    public static async greenRepackAdminAuthorization(req: any, res: any, next: any) {
        try {
            let member = await AuthVerifications._greenRepackRepository.getGreenRepackMemberById(req.userId)
            if (member == undefined || !member.isAdmin()) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }
}