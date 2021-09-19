import { IPaymentHandler } from "../../application/interfaces/services/IPaymentHandler";

export class PaymentHandler implements IPaymentHandler {
    acceptPayment(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}