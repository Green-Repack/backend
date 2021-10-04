export class NotVerifiedError extends Error {
    constructor(errorMessage: string) {
        super(errorMessage)
    }
}