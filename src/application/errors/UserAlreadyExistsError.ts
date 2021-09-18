export class UserAlreadyExistsError extends Error {
    constructor() {
        super("This email address already used!")
    }
}