import { injectable } from "inversify";
import { IPaymentHandler } from "../../application/interfaces/services/IPaymentHandler";

@injectable()
export class PaymentHandler implements IPaymentHandler {
    emitPayment(amount: number, userId: string): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    acceptPayment(amount: number): Promise<string> {
        throw new Error("Method not implemented.");
    }    
}