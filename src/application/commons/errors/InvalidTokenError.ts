export class InvalidTokenError extends Error {
    constructor(errorMessage: string) {
        super(errorMessage)
    }
}