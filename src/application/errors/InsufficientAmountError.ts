export class InsufficientAmountError extends Error {
    constructor(errorMessage: string) {
        super(errorMessage)
    }
}