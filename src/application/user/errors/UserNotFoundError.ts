export class UserNotFoundError extends Error {
    constructor() {
        super("The user is not found!")
    }
}