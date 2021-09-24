import { IAssociationRepository } from "../../application/interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../../application/interfaces/repository/IGreenRepackRepository";
import { IUserRepository } from "../../application/interfaces/repository/IUserRepository";
import { IJwtHandler } from "../../application/interfaces/services/IJwtHandler";
import { AssociationRepository } from "../persistence/repositories/AssociationRepository";
import { GreenRepackRepository } from "../persistence/repositories/GreenRepackRepository";
import { UserRepository } from "../persistence/repositories/UserRepository";
import { JwtHandler } from "./JwtHandler";

export class AuthorizationHandler {
    static _userRepository: IUserRepository = new UserRepository;
    static _greenRepackRepository: IGreenRepackRepository = new GreenRepackRepository;
    static _associationRepository: IAssociationRepository = new AssociationRepository;
    static _jwtHandler: IJwtHandler = new JwtHandler;

    public static async userAuth(req: any, res: any, next: any) {
        try {
            const authorization = req.header("Authorization");

            const splitAuthorizationHeader = authorization.toString().split(" ");

            const bearer = splitAuthorizationHeader[0];
            const token = splitAuthorizationHeader[1];

            if (bearer.toString() !== "Bearer") return res.status(401).json("The token is not a bearer")
            if (!token) return res.status(401).json("The token is missing")

            const iD = await this._jwtHandler.verifyToken(token)
            req.userId = iD
            
            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }

    public static async marchandAuthorization(req: any, res: any, next: any) {
        try {
            let user = await this._userRepository.getUserById(req.userId)
            if (user == undefined || !user.isMarchand()) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }

    public static async associationAuthorization(req: any, res: any, next: any) {
        try {
            let association = await this._associationRepository.getAssociationById(req.userId)
            if (association == undefined) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }    

    public static async greenRepackAuthorization(req: any, res: any, next: any) {
        try {
            let member = await this._greenRepackRepository.getGreenRepackMemberById(req.userId)
            if (member == undefined) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }

    public static async greenRepackAdminAuthorization(req: any, res: any, next: any) {
        try {
            let member = await this._greenRepackRepository.getGreenRepackMemberById(req.userId)
            if (member == undefined || !member.isAdmin()) return res.status(401).json("Unauthorized")

            next();
        } catch(error) {
            console.log(error)
            res.status(401).json(error);
        }
    }
}