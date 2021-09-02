export interface IGiveGreenCoinsUseCase {
    execute(associationId: string, quantity: number): void
}