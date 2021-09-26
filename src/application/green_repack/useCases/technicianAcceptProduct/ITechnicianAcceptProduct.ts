
export interface ITechnicianAcceptProduct {
    execute(productId: string, technicianId: string): Promise<void>
}
