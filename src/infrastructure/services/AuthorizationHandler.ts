import { IAssociationRepository } from "../../application/interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../../application/interfaces/repository/IGreenRepackRepository";
import { IUserRepository } from "../../application/interfaces/repository/IUserRepository";
import { IJwtHandler } from "../../application/interfaces/services/IJwtHandler";
import { AssociationRepository } from "../persistence/repositories/AssociationRepository";
import { GreenRepackRepository } from "../persistence/repositories/GreenRepackRepository";
import { UserRepository } from "../persistence/repositories/UserRepository";
import { JwtHandler } from "./JwtHandler";

export class AuthorizationHandler {
    static userRepository: IUserRepository = new UserRepository;
    static greenRepackRepository: IGreenRepackRepository = new GreenRepackRepository;
    static associationRepository: IAssociationRepository = new AssociationRepository;
    static jwtHandler: IJwtHandler = new JwtHandler;

    public static async userAuth(req: any, res: any, next: any) {
        try {
            const authorization = req.header("Authorization");

            const splitAuthorizationHeader = authorization.toString().split(" ");

            const bearer = splitAuthorizationHeader[0];
            const token = splitAuthorizationHeader[1];

            if (bearer.toString() !== "Bearer") return res.status(401).json({error: "The token is not a bearer"})
            if (!token) return res.status(401).json({error : "The token is missing"})

            const iD = await AuthorizationHandler.jwtHandler.verifyToken(token)
            req.userId = iD
            
            next();
        } catch(error) {
            console.log(error)
            res.status(401).json({ error: error.message });
        }
    }

    public static async marchandAuthorization(req: any, res: any, next: any) {
        try {
            let user = await AuthorizationHandler.userRepository.getUserById(req.userId)
            if (user == undefined || !user.isMerchant()) return res.status(403).json({error: "Unauthorized"})

            next();
        } catch(error) {
            console.log(error)
            res.status(403).json({ error: error.message });
        }
    }

    public static async associationAuthorization(req: any, res: any, next: any) {
        try {
            let association = await AuthorizationHandler.associationRepository.getAssociationById(req.userId)
            if (association == undefined) return res.status(403).json({error: "Unauthorized"})

            next();
        } catch(error) {
            console.log(error)
            res.status(403).json({ error: error.message });
        }
    }    

    public static async greenRepackAuthorization(req: any, res: any, next: any) {
        try {
            let member = await AuthorizationHandler.greenRepackRepository.getGreenRepackMemberById(req.userId)
            if (member == undefined) return res.status(403).json({error: "Unauthorized"})

            next();
        } catch(error) {
            console.log(error)
            res.status(403).json({ error: error.message });
        }
    }

    public static async greenRepackAdminAuthorization(req: any, res: any, next: any) {
        try {
            let member = await AuthorizationHandler.greenRepackRepository.getGreenRepackMemberById(req.userId)
            if (member == undefined || !member.isAdmin()) return res.status(403).json({error: "Unauthorized"})

            next();
        } catch(error) {
            console.log(error)
            res.status(403).json({ error: error.message });
        }
    }
}