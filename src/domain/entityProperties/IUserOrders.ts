export interface IUserOrders {
    id: string
    amount: number
    paymentDate: Date
    itemsId: Array<string>
}