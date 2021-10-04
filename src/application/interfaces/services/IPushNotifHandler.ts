import { Product } from "../../../domain/entity/Product";

export interface IPushNotifHandler {
    sendNotification(product: Product): void;
}