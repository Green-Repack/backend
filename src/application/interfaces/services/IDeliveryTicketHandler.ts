import { User } from "../../../domain/entity/User";

export interface IDeliveryTicketHandler {
    generate(user: User): unknown
}