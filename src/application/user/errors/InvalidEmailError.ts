export class InvalidEmailError extends Error {
    constructor(errorMessage: string) {
        super(errorMessage)
    }
}