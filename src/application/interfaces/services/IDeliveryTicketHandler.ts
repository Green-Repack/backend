import { IAddress } from "../../../domain/entityProperties/IAddress";

export interface IDeliveryTicketHandler {
    generate(firstName: string, lastName: string, address: IAddress): unknown
}