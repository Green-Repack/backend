import { injectable } from "inversify";
import { IDeliveryTicketHandler } from "../../application/interfaces/services/IDeliveryTicketHandler";
import { User } from "../../domain/entity/User";
import { IAddress } from "../../domain/entityProperties/IAddress";


@injectable()
export class DeliveryTicketHanlder implements IDeliveryTicketHandler {
    generate(senderLastName: string, senderFirstName: string, senderAddress: IAddress, receiverLastName: string, receiverFirstName: string, receiverAddress: IAddress, weight: number, productId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}