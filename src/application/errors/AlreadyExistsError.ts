export class AlreadyExistsError extends Error {
    constructor(errorMessage: string) {
        super(errorMessage)
    }
}