
export interface ITechnicianRefuseProduct {
    execute(productId: string, technicianId: string): Promise<void>
}
