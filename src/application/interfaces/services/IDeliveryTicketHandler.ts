import { IAddress } from "../../../domain/entityProperties/IAddress";

export interface IDeliveryTicketHandler {
    generate(senderLastName: string, senderFirstName: string, senderAddress: IAddress,
        receiverLastName: string, receiverFirstName: string, receiverAddress: IAddress, 
        weight: number, productId: string): Promise<string>
}