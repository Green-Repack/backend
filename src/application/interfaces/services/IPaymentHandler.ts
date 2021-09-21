export interface IPaymentHandler {
    acceptPayment(amount: number): Promise<string>
}