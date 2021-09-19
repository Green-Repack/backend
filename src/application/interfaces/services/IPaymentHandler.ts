export interface IPaymentHandler {
    acceptPayment(): Promise<void>
}