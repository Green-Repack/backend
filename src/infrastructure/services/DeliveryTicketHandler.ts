import { IDeliveryTicketHandler } from "../../application/interfaces/services/IDeliveryTicketHandler";
import { IAddress } from "../../domain/entityProperties/IAddress";

export class DeliveryTicket implements IDeliveryTicketHandler {
    generate(firstName: string, lastName: string, address: IAddress): unknown {
        throw new Error("Method not implemented.");
    }
    
}