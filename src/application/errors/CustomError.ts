class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

