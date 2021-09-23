import { injectable } from "inversify";
import { IDeliveryTicketHandler } from "../../application/interfaces/services/IDeliveryTicketHandler";
import { User } from "../../domain/entity/User";


@injectable()
export class DeliveryTicketHanlder implements IDeliveryTicketHandler {
    generate(user: User): unknown {
        throw new Error("Method not implemented.");
    }
    
}