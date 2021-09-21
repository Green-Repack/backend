import { IPaymentHandler } from "../../application/interfaces/services/IPaymentHandler";

export class PaymentHandler implements IPaymentHandler {
    acceptPayment(amount: number): Promise<string> {
        throw new Error("Method not implemented.");
    }    
}