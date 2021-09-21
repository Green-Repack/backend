export interface IPaymentHandler {
    acceptPayment(amount: number): Promise<string>
    emitPayment(amount: number, userId: string): Promise<unknown>
}