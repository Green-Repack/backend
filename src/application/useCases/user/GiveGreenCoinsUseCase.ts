import { Guard } from "../../commons/Guard";
import { InsufficientAmountError } from "../../errors/InsufficientAmountError";
import { NotVerifiedError } from "../../errors/NotVerifiedError";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IGiveGreenCoinsUseCase } from "./IGiveGreenCoinsUseCase";

export class GiveGreenCoinsUseCase implements IGiveGreenCoinsUseCase {
    async execute(requestInfo: any, userId: string, associationRepository: IAssociationRepository, userRepository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(requestInfo.associationName, "Association's name is required")
            Guard.AgainstNullOrUndefined(requestInfo.projectName, "Project's name is required")
            Guard.AgainstNullOrUndefined(requestInfo.actionName, "Action's name is required")

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let association = await associationRepository.getAssociationByName(requestInfo.associationName)
            if (association == undefined) throw new NotFoundError("Association not found")

            let project = await associationRepository.getProjectByName(requestInfo.associationName, requestInfo.projectName)
            if (project == undefined) throw new NotFoundError("The project not found")
            if (!project.verified) throw new NotVerifiedError("The project is not verified yet")

            let action = await associationRepository.getProjectActionByName(requestInfo.associationName, requestInfo.projectName, requestInfo.actionName)
            if (action == undefined) throw new NotFoundError("The project action was not found.")

            if (user.greenCoins.amount >= requestInfo.greenCoinsAmount) {
                action.greenCoins += requestInfo.greenCoinsAmount
                await associationRepository.saveAction(requestInfo.associationName, requestInfo.projectName, action)
                user.greenCoins.amount -= requestInfo.greenCoinsAmount
            } else {
                throw new InsufficientAmountError("The amount of green coins is not sufficient")
            }
        } catch (error) {
            throw error
        }
    }

}